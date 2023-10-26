import React, { FC } from 'react';

import clsx from 'clsx';

import { Ticker } from '~/types/currencyTypes';
import { ValueBlankComponent } from '~/components/ValueBlank/ValueBlankComponent';
import { BalancesItemComponent } from '~/modules/Dashboard/components/BalancesItem/BalancesItemComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  totalBalance: number;
  ticker: Ticker;
  buyingPower: number;
  margin: number;
  netExposure: number;
};

export const DashboardBalancesSummaryView: FC<Props> = ({
  className,
  totalBalance,
  buyingPower,
  ticker,
  margin,
  netExposure
}) => (
  <div className={clsx(style.dashboardBalances, className)}>
    <div className={style.dashboardBalancesRow}>
      <BalancesItemComponent label="Account balance">
        <ValueBlankComponent>{totalBalance}</ValueBlankComponent>
      </BalancesItemComponent>

      <BalancesItemComponent label={`Net exposure (${ticker})`}>
        <ValueBlankComponent fix={8}>{netExposure}</ValueBlankComponent>
      </BalancesItemComponent>
    </div>

    <div className={style.dashboardBalancesRow}>
      <BalancesItemComponent label="Buying power">
        <ValueBlankComponent>{buyingPower}</ValueBlankComponent>
      </BalancesItemComponent>

      <BalancesItemComponent label="Margin usage">
        <ValueBlankComponent>{margin}</ValueBlankComponent>
      </BalancesItemComponent>
    </div>
  </div>
);
