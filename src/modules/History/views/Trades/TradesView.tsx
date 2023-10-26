import React, { FC, MouseEvent, ReactNode, RefObject, UIEvent } from 'react';

import clsx from 'clsx';

import { Ticker } from '~/types/currencyTypes';
import { TradeDay } from '~/types/tradesHistoryTypes';
import { TradesHistoryHeaderComponent } from '~/modules/History/components/TradesHistoryHeader/TradesHistoryHeaderComponent';
import { EmptyWrapperComponent } from '~/components/EmptyWrapper/EmptyWrapperComponent';
import { LoadingWrapperComponent } from '~/components/LoadingWrapper/LoadingWrapperComponent';
import { DayAccordionComponent } from '~/modules/History/components/DayAccordion/DayAccordionComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  loading: boolean;
  loadingDay: null | string;
  disabled: boolean;
  ticker: Ticker;
  listRef: RefObject<HTMLDivElement>;
  visibleDays: string[];
  visibleSessions: string[];
  days: TradeDay<number>[];
  children: ReactNode;
  handleScroll: (event: UIEvent<HTMLDivElement>) => void;
  handleAccordionToggle: (
    day: Omit<TradeDay<number>, 'sessions' | 'orders'>
  ) => (event: MouseEvent<HTMLButtonElement>) => void;
  handleSessionAccordionToggle: (id: string) => (event: MouseEvent<HTMLButtonElement>) => void;
};

export const TradesView: FC<Props> = ({
  className,
  loading,
  disabled,
  loadingDay,
  ticker,
  listRef,
  visibleDays,
  visibleSessions,
  days,
  children,
  handleScroll,
  handleAccordionToggle,
  handleSessionAccordionToggle
}) => (
  <div className={clsx(style.historyTrades, className)}>
    <LoadingWrapperComponent visible={loading && !days.length}>
      <EmptyWrapperComponent message="You have no trade history yet" visible={!days.length}>
        <TradesHistoryHeaderComponent ticker={ticker} />
        <div className={style.historyTradesList} onScroll={handleScroll} ref={listRef}>
          {children}
          {days.map(({ sessions, orders, ...day }) => (
            <DayAccordionComponent
              {...day}
              orders={orders}
              loading={loadingDay === day.date}
              disabled={disabled}
              sessions={sessions}
              key={day.date}
              visible={visibleDays.includes(day.date)}
              visibleSessions={visibleSessions}
              handleAccordionToggle={handleAccordionToggle(day)}
              handleSessionAccordionToggle={handleSessionAccordionToggle}
            />
          ))}
        </div>
      </EmptyWrapperComponent>
    </LoadingWrapperComponent>
  </div>
);
