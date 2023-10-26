import React, { FC } from 'react';

import { Currency } from '~/types/currencyTypes';
import { SummaryRowComponent } from '~/components/SummaryRow/SummaryRowComponent';
import { ValueBlankComponent } from '~/components/ValueBlank/ValueBlankComponent';

import style from './style.module.scss';

type Props = {
  buyingPower: number;
  marginUsage: number;
  totalBalance: number;
  ccy: Currency;
};

export const TradeDataAccountSummaryView: FC<Props> = ({ buyingPower, marginUsage, totalBalance, ccy }) => (
  <div className={style.positionSummary}>
    <SummaryRowComponent label={`Buying power (${ccy})`}>
      <ValueBlankComponent>{buyingPower}</ValueBlankComponent>
    </SummaryRowComponent>

    <SummaryRowComponent label={`Margin usage (${ccy})`}>
      <ValueBlankComponent>{marginUsage}</ValueBlankComponent>
    </SummaryRowComponent>

    <SummaryRowComponent label={`Account balance (${ccy})`}>
      <ValueBlankComponent>{totalBalance}</ValueBlankComponent>
    </SummaryRowComponent>
  </div>
);
