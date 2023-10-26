import React, { FC } from 'react';

import clsx from 'clsx';

import { LiquidTransaction } from '~/types/liquidTransactionTypes';
import { TableTransactionsComponent } from '~/components/TableTransactions/TableTransactionsComponent';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { DividerComponent } from '~/components/Divider/DividerComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  loading: boolean;
  deposits: LiquidTransaction<number>[];
};

export const RecentDepositsView: FC<Props> = ({ className, loading, deposits }) => (
  <div className={clsx(style.ongoingDeposits, className)}>
    <ProtectedLayoutHeadlineComponent className={style.ongoingDepositsHeadline}>
      Recent deposits
    </ProtectedLayoutHeadlineComponent>

    <DividerComponent className={style.ongoingDepositsDivider} />

    <TableTransactionsComponent
      className={style.ongoingDepositsTable}
      transactions={deposits}
      loading={loading}
      emptyMessage="You have no recent deposits yet"
      withConfs
    />
  </div>
);
