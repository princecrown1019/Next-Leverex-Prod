import React, { FC } from 'react';

import clsx from 'clsx';

import { LiquidTransaction } from '~/types/liquidTransactionTypes';
import { TableTransactionsComponent } from '~/components/TableTransactions/TableTransactionsComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  loading: boolean;
  transactions: LiquidTransaction<number>[];
  cancellingIds: string[];
  handleCancelClick: (id: string, requestId?: string) => void;
};

export const TransactionsView: FC<Props> = ({ className, loading, transactions, cancellingIds, handleCancelClick }) => (
  <TableTransactionsComponent
    className={clsx(style.historyTransactions, className)}
    loading={loading}
    transactions={transactions}
    emptyMessage="You have no transfers history"
    cancellingIds={cancellingIds}
    virtualizedHeightOffset={176}
    handleCancelClick={handleCancelClick}
  />
);
