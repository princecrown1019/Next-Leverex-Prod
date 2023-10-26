import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '~/store/types';
import { selectLiquidTransactionsFiltered } from '~/store/LiquidTransactions/selectors';
import { selectDeposits, selectDepositsLoading } from '~/store/Deposits/selectors';
import {
  selectWithdrawals,
  selectCancellingWithdrawalIds,
  selectWithdrawalsLoading
} from '~/store/Withdrawals/selectors';
import { useCancelPendingWithdrawalCommand } from '~/modules/History/commands/CancelPendingWithdrawal/useCancelPendingWithdrawalCommand';
import { useTransactionsContext } from '~/modules/History/contexts/Transactions/TransactionsContext';
import { useLoadDepositsCommand } from '~/modules/History/commands/LoadDeposits/useLoadDepositsCommand';
import { useLoadWithdrawalsCommand } from '~/modules/History/commands/LoadWithdrawals/useLoadWithdrawalsCommand';
import { TransactionsView, Props as ViewProps } from '~/modules/History/views/Transactions/TransactionsView';

type Props = Pick<ViewProps, 'className'>;

export const TransactionsContainer: FC<Props> = ({ className }) => {
  const { filterState } = useTransactionsContext();

  const transactions = useSelector((state: AppState) => selectLiquidTransactionsFiltered(state, filterState));
  const withdrawals = useSelector(selectWithdrawals);
  const deposits = useSelector(selectDeposits);
  const cancellingIds = useSelector(selectCancellingWithdrawalIds);
  const withdrawalsLoading = useSelector(selectWithdrawalsLoading);
  const depositsLoading = useSelector(selectDepositsLoading);

  useLoadDepositsCommand(!!deposits.length);
  useLoadWithdrawalsCommand(!!withdrawals.length);
  const cancelPendingWithdrawal = useCancelPendingWithdrawalCommand();

  return (
    <TransactionsView
      className={className}
      loading={depositsLoading || withdrawalsLoading}
      transactions={transactions}
      cancellingIds={cancellingIds}
      handleCancelClick={cancelPendingWithdrawal}
    />
  );
};
