import React, { FC, useCallback, useState, UIEvent, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TradeDay } from '~/types/tradesHistoryTypes';
import { AppState } from '~/store/types';
import { selectLoggedIn } from '~/store/Session/selectors';
import { selectProduct } from '~/store/Market/selectors';
import {
  selectTradeDaysHistoryLoading,
  selectTradeSessionsHistoryLoading,
  selectTradesHistoryLoading,
  selectTradeSessionHistory,
  selectTradeDaysHistoryHasNext,
  selectTradeDaysSessionOrdersHistoryFiltered,
  selectOpenSession
} from '~/store/TradesHistory/selectors';
import { selectSessionOrdersWithPNL } from '~/store/Orders/selectors';
import { selectCurrentProductNextCutOffTime } from '~/store/Stats/selectors';
import { useLoadTradeSessionsHistoryCommand } from '~/modules/History/commands/LoadTradeSessionsHistory/useLoadTradeSessionsHistoryCommand';
import { useResetTradesHistoryCommand } from '~/modules/History/commands/ResetTradesHistory/useResetTradesHistoryCommand';
import { useLoadOrdersHistoryCommand } from '~/modules/History/commands/LoadOrdersHistory/useLoadOrdersHistoryCommand';
import { useTradesContext } from '~/modules/History/contexts/Trades/TradesContext';
import { useResetDayHistoryCommand } from '~/modules/History/commands/ResetDayHistory/useResetDayHistoryCommand';
import { useLoadSessionOrdersCommand } from '~/modules/History/commands/LoadSessionOrders/useSessionOrdersCommand';
import { SessionAccordionComponent } from '~/modules/History/components/SessionAccordion/SessionAccordionComponent';
import { useLoadTradeDaysHistoryCommand } from '~/modules/History/commands/LoadTradeDaysHistory/useLoadTradeDaysHistoryCommand';
import { toUTCStringDate } from '~/services/DateFormat/dateFormatService';
import { usePrevious } from '~/hooks/Previous/usePrevious';
import { TradesView, Props as ViewProps } from '~/modules/History/views/Trades/TradesView';

type Props = Pick<ViewProps, 'className'>;

export const TradesContainer: FC<Props> = ({ className }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const { filterState } = useTradesContext();

  const loggedIn = useSelector(selectLoggedIn);
  const { ticker } = useSelector(selectProduct);
  const loadingDays = useSelector(selectTradeDaysHistoryLoading);
  const loadingSessions = useSelector(selectTradeSessionsHistoryLoading);
  const loadingOrders = useSelector(selectTradesHistoryLoading);
  const sessions = useSelector(selectTradeSessionHistory);
  const hasDays = useSelector(selectTradeDaysHistoryHasNext);
  const nextCutOffAt = useSelector(selectCurrentProductNextCutOffTime);
  const days = useSelector((state: AppState) => selectTradeDaysSessionOrdersHistoryFiltered(state, filterState));
  const openSession = useSelector((state: AppState) => selectOpenSession(state, filterState));
  const openOrders = useSelector(selectSessionOrdersWithPNL);

  const [loadingDay, setLoadingDay] = useState<null | string>(null);
  const [visibleDays, setVisibleDays] = useState<string[]>([]);
  const [visibleSessions, setVisibleSessions] = useState<string[]>([]);

  useResetTradesHistoryCommand();
  useLoadSessionOrdersCommand(loggedIn, !openOrders);
  const loadDays = useLoadTradeDaysHistoryCommand();
  const loadSessions = useLoadTradeSessionsHistoryCommand();
  const loadOrders = useLoadOrdersHistoryCommand();
  const resetDay = useResetDayHistoryCommand();

  const prevDaysLength = usePrevious(days.length);

  useEffect(() => {
    if (days.length) return;

    setVisibleDays([]);
    setVisibleSessions([]);
  }, [days.length]);

  useEffect(() => {
    if (!openSession) return;

    setVisibleSessions((prevSessions) => [...prevSessions, openSession.id]);
  }, [openSession?.id]);

  useEffect(() => {
    if (!days.length) return;

    const { timeEnd, timeStart, date } = days[0];
    if (visibleDays.includes(date)) return;

    loadSessions(timeStart, timeEnd);
    loadOrders(timeStart, timeEnd, date);
  }, [days[0]?.timeStart]);

  useEffect(() => {
    if (!days.length) return;

    const cutOffDate = toUTCStringDate(nextCutOffAt);
    const { timeEnd, timeStart, date } = days[0];
    if (!visibleDays.includes(cutOffDate) || date !== cutOffDate) return;

    loadSessions(timeStart, timeEnd);
    loadOrders(timeStart, timeEnd, date);
  }, [nextCutOffAt]);

  useEffect(() => {
    if (!prevDaysLength || days.length >= prevDaysLength) return;

    loadDays();
  }, [days.length]);

  useEffect(() => {
    if (loadingSessions || !sessions.length || !days.length || !visibleDays.length || !loadingDay) return;

    const lastSessionId = days.find((day) => day.date === loadingDay)?.sessions[0]?.id;
    if (!lastSessionId) {
      setLoadingDay(null);
      return;
    }

    setLoadingDay(null);
    setVisibleSessions((prevSessions) => [...prevSessions, lastSessionId]);
  }, [loadingSessions]);

  const handleScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (loadingDays || !hasDays) return;

      const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
      if (scrollTop + clientHeight < scrollHeight - 64) return;

      loadDays();
    },
    [loadingDays, loadDays, hasDays]
  );

  const handleAccordionToggle = useCallback(
    (day: Omit<TradeDay<number>, 'sessions' | 'orders'>) => () => {
      if (loadingOrders || !loggedIn) return;

      const { date, timeStart, timeEnd } = day;

      if (visibleDays.includes(date)) {
        setLoadingDay(null);
        setVisibleDays((prevDays) => prevDays.filter((dayDate) => dayDate !== date));
        resetDay(timeStart, timeEnd);
      } else {
        setLoadingDay(date);
        loadSessions(timeStart, timeEnd);
        loadOrders(timeStart, timeEnd, date);
        setVisibleDays((prevDays) => [...prevDays, date]);
      }
    },
    [loadingOrders, loggedIn, visibleDays]
  );

  const handleSessionAccordionToggle = useCallback(
    (sessionId: string) => () => {
      if (visibleSessions.includes(sessionId)) {
        setVisibleSessions((prevSessions) => prevSessions.filter((id) => id !== sessionId));
      } else {
        setVisibleSessions((prevSessions) => [...prevSessions, sessionId]);
      }
    },
    [visibleSessions]
  );

  return (
    <TradesView
      className={className}
      listRef={listRef}
      ticker={ticker}
      loading={loadingDays || loadingSessions}
      loadingDay={loadingDay}
      disabled={loadingSessions}
      days={days}
      visibleDays={visibleDays}
      visibleSessions={visibleSessions}
      handleScroll={handleScroll}
      handleAccordionToggle={handleAccordionToggle}
      handleSessionAccordionToggle={handleSessionAccordionToggle}
    >
      {openSession && openOrders.length ? (
        <SessionAccordionComponent {...openSession} separate visible orders={openOrders} />
      ) : null}
    </TradesView>
  );
};
