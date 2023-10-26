import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCancellingWithdrawalIds,
  selectRecentWithdrawals,
  selectWithdrawalsLoading
} from '~/store/Withdrawals/selectors';
import { useCancelPendingWithdrawalCommand } from '~/modules/Withdraw/commands/CancelPendingWithdrawal/useCancelPendingWithdrawalCommand';
import { useLoadWithdrawalsCommand } from '~/modules/Withdraw/commands/LoadWithdrawals/useLoadWithdrawalsCommand';
import {
  RecentWithdrawalsView,
  Props as ViewProps
} from '~/modules/Withdraw/views/RecentWithdrawals/RecentWithdrawalsView';

type Props = Pick<ViewProps, 'className'>;

export const RecentWithdrawalsContainer: FC<Props> = ({ className }) => {
  const loading = useSelector(selectWithdrawalsLoading);
  const withdrawals = useSelector(selectRecentWithdrawals);
  const cancellingIds = useSelector(selectCancellingWithdrawalIds);

  useLoadWithdrawalsCommand(!!withdrawals.length);
  const cancelPendingWithdrawal = useCancelPendingWithdrawalCommand();

  return (
    <RecentWithdrawalsView
      className={className}
      loading={loading}
      withdrawals={withdrawals}
      cancellingIds={cancellingIds}
      handleCancelClick={cancelPendingWithdrawal}
    />
  );
};
