import React, { FC } from 'react';

import { Currency, Ticker } from '~/types/currencyTypes';
import { SummaryRowComponent } from '~/components/SummaryRow/SummaryRowComponent';
import { ValueBlankComponent } from '~/components/ValueBlank/ValueBlankComponent';
import { TextColouredComponent } from '~/components/TextColoured/TextColouredComponent';
import { ChangeArrowThinComponent } from '~/components/ChangeArrowThin/ChangeArrowThinComponent';

import style from './style.module.scss';

type Props = {
  netExposure: number;
  sessionProfitLoss: number;
  notionalExposure: number;
  ccy: Currency;
  ticker: Ticker;
};

export const TradeDataPositionSummaryView: FC<Props> = ({
  netExposure,
  sessionProfitLoss,
  notionalExposure,
  ccy,
  ticker
}) => (
  <div className={style.positionSummary}>
    <SummaryRowComponent label={`Net Exposure (${ticker})`}>
      <ValueBlankComponent fix={8}>{netExposure}</ValueBlankComponent>
    </SummaryRowComponent>

    <SummaryRowComponent label={`Session P/L (${ccy})`}>
      <TextColouredComponent positive={sessionProfitLoss > 0} visible={!!sessionProfitLoss}>
        <ValueBlankComponent withPositiveChar>{sessionProfitLoss}</ValueBlankComponent>
      </TextColouredComponent>
    </SummaryRowComponent>

    <SummaryRowComponent label={`Notional exposure  (${ccy})`} customChild>
      <div className={style.positionSummaryValueWithIcon}>
        <ChangeArrowThinComponent
          className={style.positionSummaryValueIcon}
          positive={notionalExposure > 0}
          visible={!!notionalExposure}
        />
        <span className={style.positionSummaryValue}>
          <ValueBlankComponent abs>{notionalExposure}</ValueBlankComponent>
        </span>
      </div>
    </SummaryRowComponent>
  </div>
);
