import React, { FC, MouseEvent, useCallback } from 'react';

import clsx from 'clsx';

import { TradeSession } from '~/types/tradesHistoryTypes';
import { Order, RolloverType } from '~/types/orderTypes';
import { SessionAccordionBodyRowComponent } from '~/modules/History/components/SessionAccordionBodyRow/SessionAccordionBodyRowComponent';
import { SessionAccordionHeaderComponent } from '~/modules/History/components/SessionAccordionHeader/SessionAccordionHeaderComponent';
import { TradesAccordionComponent } from '~/modules/History/components/Accordion/TradesAccordionComponent';

import style from './style.module.scss';

type Props = TradeSession<number> & {
  visible: boolean;
  separate?: boolean;
  orders: Order<number>[];
  handleAccordionToggle?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const SessionAccordionComponent: FC<Props> = ({
  visible,
  orders,
  timeEnd,
  timeStart,
  separate,
  close,
  open,
  rolloverType,
  id,
  volume,
  fee,
  pnl,
  handleAccordionToggle
}) => {
  const renderRow = useCallback(
    (order: Order<number>) => <SessionAccordionBodyRowComponent key={order.id} separate={separate} {...order} />,
    [separate]
  );

  return (
    <TradesAccordionComponent
      visibleClassName={clsx(style.sessionAccordionHeaderVisible, separate && style.sessionAccordionHeaderSeparate)}
      visible={visible}
      rows={orders}
      renderRow={renderRow}
      handleToggle={handleAccordionToggle}
    >
      <SessionAccordionHeaderComponent
        separate={separate}
        visible={visible}
        start={timeStart}
        end={timeEnd}
        rollover={rolloverType === RolloverType.ROLLOVER}
        id={id}
        volume={volume}
        profitLoss={pnl}
        close={close}
        open={open}
        fee={fee}
      />
    </TradesAccordionComponent>
  );
};
