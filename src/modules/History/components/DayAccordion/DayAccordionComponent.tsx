import React, { FC, MouseEvent, useCallback } from 'react';

import { TradeDay, TradeSession } from '~/types/tradesHistoryTypes';
import { SessionAccordionComponent } from '~/modules/History/components/SessionAccordion/SessionAccordionComponent';
import { DayAccordionHeaderComponent } from '~/modules/History/components/DayAccordionHeader/DayAccordionHeaderComponent';
import { TradesAccordionComponent } from '~/modules/History/components/Accordion/TradesAccordionComponent';

type Props = TradeDay<number> & {
  visibleSessions?: string[];
  visible: boolean;
  loading: boolean;
  disabled: boolean;
  handleAccordionToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  handleSessionAccordionToggle: (id: string) => (event: MouseEvent<HTMLButtonElement>) => void;
};

export const DayAccordionComponent: FC<Props> = ({
  date,
  visibleSessions,
  sessions,
  orders,
  visible,
  loading,
  disabled,
  open,
  volume,
  close,
  fee,
  pnl,
  handleAccordionToggle,
  handleSessionAccordionToggle
}) => {
  const getSessionOrders = useCallback(
    (sessionId: string, sessionIds?: string[]) => {
      return orders.filter((order) => sessionIds?.includes(order.sessionId) ?? order.sessionId === sessionId);
    },
    [orders]
  );

  const renderRow = useCallback(
    (session: TradeSession<number>) => (
      <SessionAccordionComponent
        key={session.id}
        orders={getSessionOrders(session.id, session.clientIds)}
        visible={!!visibleSessions?.includes(session.id)}
        handleAccordionToggle={handleSessionAccordionToggle(session.id)}
        {...session}
      />
    ),
    [visibleSessions, orders]
  );

  return (
    <TradesAccordionComponent
      visible={visible}
      handleToggle={handleAccordionToggle}
      rows={sessions}
      disabled={disabled}
      renderRow={renderRow}
    >
      <DayAccordionHeaderComponent
        visible={visible}
        date={date}
        loading={loading}
        volume={volume}
        profitLoss={pnl}
        close={close}
        open={open}
        fee={fee}
      />
    </TradesAccordionComponent>
  );
};
