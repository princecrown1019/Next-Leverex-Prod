import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectRecentDeposits, selectDepositsLoading } from '~/store/Deposits/selectors';
import { useLoadDepositsCommand } from '~/modules/Deposit/commands/LoadDeposits/useLoadDepositsCommand';
import { RecentDepositsView, Props as ViewProps } from '~/modules/Deposit/views/RecentDeposits/RecentDepositsView';

type Props = Pick<ViewProps, 'className'>;

export const RecentDepositsContainer: FC<Props> = ({ className }) => {
  const loading = useSelector(selectDepositsLoading);
  const deposits = useSelector(selectRecentDeposits);

  useLoadDepositsCommand(!!deposits.length);

  return <RecentDepositsView className={className} loading={loading} deposits={deposits} />;
};
