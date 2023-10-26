import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectLeverage } from '~/store/Orders/selectors';
import { selectDeposits, selectNetDepositAmountValue, selectTotalDepositAmountValue } from '~/store/Deposits/selectors';
import { selectTotalWithdrawalAmountValue, selectWithdrawals } from '~/store/Withdrawals/selectors';
import { selectAllTimeFees } from '~/store/FeesHistory/selectors';
import { useLoadDepositsCommand } from '~/modules/Dashboard/commands/LoadDeposits/useLoadDepositsCommand';
import { useLoadWithdrawalsCommand } from '~/modules/Dashboard/commands/LoadWithdrawals/useLoadWithdrawalsCommand';
import {
  DashboardTransactionsSummaryView,
  Props as ViewProps
} from '~/modules/Dashboard/views/TransactionsSummary/TransactionsSummaryView';
import { useAllTimeFeesCommand } from '~/modules/Dashboard/commands/LoadAllTimeFees/useAllTimeFeesCommand';
import { useLoadTransactionsSummaryCommand } from 'modules/Dashboard/commands/TransactionsSummary/useLoadTransactionsSummaryCommand';

type Props = Pick<ViewProps, 'className'>;

export const DashboardTransactionsSummaryContainer: FC<Props> = ({ className }) => {
  const deposits = useSelector(selectDeposits);
  const withdrawals = useSelector(selectWithdrawals);
  const totalWithdrawals = useSelector(selectTotalWithdrawalAmountValue);
  const totalDeposits = useSelector(selectTotalDepositAmountValue);
  const netDeposits = useSelector(selectNetDepositAmountValue);
  const leverageRatio = useSelector(selectLeverage);
  const feesPayed = useSelector(selectAllTimeFees);
  const loadTransactionsSummary = useLoadTransactionsSummaryCommand();

  useEffect(() => {
    loadTransactionsSummary();
  }, []);

  useLoadDepositsCommand(!!deposits.length);
  useLoadWithdrawalsCommand(!!withdrawals.length);
  useAllTimeFeesCommand(!!feesPayed);

  return (
    <DashboardTransactionsSummaryView
      className={className}
      totalWithdrawals={totalWithdrawals}
      totalDeposits={totalDeposits}
      netDeposits={netDeposits}
      feesPayed={feesPayed}
      leverageRatio={leverageRatio}
    />
  );
};
