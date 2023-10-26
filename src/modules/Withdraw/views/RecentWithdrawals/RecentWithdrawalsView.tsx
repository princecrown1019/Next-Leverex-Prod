import React, { FC } from 'react';

import clsx from 'clsx';

import { Withdrawal } from '~/types/withdrawalsTypes';
import { TableTransactionsComponent } from '~/components/TableTransactions/TableTransactionsComponent';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { DividerComponent } from '~/components/Divider/DividerComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  loading: boolean;
  withdrawals: Withdrawal<number>[];
  cancellingIds: string[];
  handleCancelClick: (id: string, requestId?: string) => void;
};

export const RecentWithdrawalsView: FC<Props> = ({
  className,
  loading,
  withdrawals,
  cancellingIds,
  handleCancelClick
}) => (
  <div className={clsx(style.ongoingWithdrawals, className)}>
    <ProtectedLayoutHeadlineComponent className={style.ongoingWithdrawalsHeadline}>
      Recent withdrawals
    </ProtectedLayoutHeadlineComponent>

    <DividerComponent className={style.ongoingWithdrawalsDivider} />

    <TableTransactionsComponent
      className={style.ongoingWithdrawalsTable}
      transactions={withdrawals}
      loading={loading}
      emptyMessage="You have no recent withdrawals yet"
      withConfs
      cancellingIds={cancellingIds}
      handleCancelClick={handleCancelClick}
    />
  </div>
);
