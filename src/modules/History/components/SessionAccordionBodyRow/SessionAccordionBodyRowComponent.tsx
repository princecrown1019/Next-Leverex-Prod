import React, { FC } from 'react';

import clsx from 'clsx';

import { Order, RolloverType } from '~/types/orderTypes';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { ChangeArrowComponent } from '~/components/ChangeArrow/ChangeArrowComponent';
import { ValueDateFullUtcComponent } from '~/components/ValueDateFullUtc/ValueDateFullUtcComponent';
import { TradesAccordionColumnComponent } from '~/modules/History/components/TradesAccordionColumn/TradesAccordionColumnComponent';
import { DefaultOrLiquidationLabelComponent } from '~/modules/History/components/DefaultOrLiquidationLabel/DefaultOrLiquidationLabelComponent';
import { NetExposureLabelComponent } from '~/components/NetExposureLabel/NetExposureLabelComponent';

import style from './style.module.scss';

type Props = Order<number> & {
  separate?: boolean;
};

export const SessionAccordionBodyRowComponent: FC<Props> = ({
  timestamp,
  price,
  cutOffPrice,
  quantity,
  tradePnl,
  referenceExposure,
  rolloverType,
  fee,
  clientIsDefault,
  clientIsLiquidation,
  separate
}) => {
  const rollover = rolloverType !== RolloverType.NOT_ROLLOVER;
  const withChanges = clientIsDefault || clientIsLiquidation;
  const classNameWithChanges = withChanges && style.tradesHistoryAccordionHeaderValueMarginRight;
  const classNameSeparate = separate && style.tradesHistoryAccordionBodyRowSeparate;

  return (
    <div className={clsx(style.tradesHistoryAccordionBodyRow, classNameSeparate)}>
      <TradesAccordionColumnComponent>
        <time className={clsx(style.tradesHistoryAccordionHeaderValue, classNameWithChanges)}>
          <ValueDateFullUtcComponent>{timestamp}</ValueDateFullUtcComponent>
        </time>
        <DefaultOrLiquidationLabelComponent liquidated={clientIsLiquidation} defaulted={clientIsDefault} />
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.tradesHistoryAccordionHeaderValue}>
          <NetExposureLabelComponent value={quantity} />
        </span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={clsx(style.tradesHistoryAccordionHeaderValue, classNameWithChanges)}>
          <ValueComponent fix={8} abs>
            {quantity}
          </ValueComponent>
        </span>
        <DefaultOrLiquidationLabelComponent liquidated={clientIsLiquidation} defaulted={clientIsDefault}>
          <ValueComponent fix={8}>{quantity - referenceExposure}</ValueComponent>
        </DefaultOrLiquidationLabelComponent>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.tradesHistoryAccordionHeaderValue}>
          <ValueComponent>{price}</ValueComponent>
        </span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.tradesHistoryAccordionHeaderValue}>
          {cutOffPrice ? <ValueComponent>{cutOffPrice}</ValueComponent> : 'Open'}
        </span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.tradesHistoryAccordionHeaderValue}>
          {rollover ? 'Roll' : <ValueComponent>{fee}</ValueComponent>}
        </span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <ChangeArrowComponent
          className={style.tradesHistoryAccordionHeaderChangeIcon}
          positive={tradePnl > 0}
          visible={!!tradePnl}
        />
        <span className={style.tradesHistoryAccordionHeaderValue}>
          <ValueComponent withPositiveChar>{tradePnl}</ValueComponent>
        </span>
      </TradesAccordionColumnComponent>
    </div>
  );
};
