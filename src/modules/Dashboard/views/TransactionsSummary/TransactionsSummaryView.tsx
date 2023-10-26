import React, { FC } from 'react';

import clsx from 'clsx';

import { ValueComponent } from '~/components/Value/ValueComponent';
import { SummaryRowComponent } from '~/components/SummaryRow/SummaryRowComponent';
import { LeverageComponent } from '~/components/Leverage/LeverageComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  totalDeposits: number;
  totalWithdrawals: number;
  netDeposits: number;
  feesPayed: number;
  leverageRatio: number;
};

export const DashboardTransactionsSummaryView: FC<Props> = ({
  className,
  totalDeposits,
  totalWithdrawals,
  netDeposits,
  feesPayed,
  leverageRatio
}) => (
  <div className={clsx(style.dashboardTransactions, className)}>
    <SummaryRowComponent label="Total deposits">
      <ValueComponent>{totalDeposits}</ValueComponent>
    </SummaryRowComponent>

    <SummaryRowComponent label="Total withdrawals">
      <ValueComponent>{totalWithdrawals}</ValueComponent>
    </SummaryRowComponent>

    <SummaryRowComponent label="Net deposits">
      <ValueComponent>{netDeposits}</ValueComponent>
    </SummaryRowComponent>

    <SummaryRowComponent label="Net fees">
      <ValueComponent>{feesPayed}</ValueComponent>
    </SummaryRowComponent>

    <LeverageComponent className={style.dashboardTransactionsLeverage} value={leverageRatio} />
  </div>
);
