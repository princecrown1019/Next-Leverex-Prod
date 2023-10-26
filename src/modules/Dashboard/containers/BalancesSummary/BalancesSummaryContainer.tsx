import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectBalances, selectBuyingPower, selectMargin, selectTotalBalance } from '~/store/Balances/selectors';
import { selectNetExposure } from '~/store/Orders/selectors';
import { useLoadBalancesCommand } from '~/modules/Dashboard/commands/LoadBalances/useLoadBalancesCommand';
import {
  DashboardBalancesSummaryView,
  Props as ViewProps
} from '~/modules/Dashboard/views/BalancesSummary/BalancesSummaryView';
import { selectProduct } from '~/store/Market/selectors';

type Props = Pick<ViewProps, 'className'>;

export const DashboardBalancesSummaryContainer: FC<Props> = ({ className }) => {
  const { ticker } = useSelector(selectProduct);
  const balances = useSelector(selectBalances);
  const margin = useSelector(selectMargin);
  const buyingPower = useSelector(selectBuyingPower);
  const totalBalance = useSelector(selectTotalBalance);
  const netExposure = useSelector(selectNetExposure);

  useLoadBalancesCommand(!!balances.length);

  return (
    <DashboardBalancesSummaryView
      className={className}
      margin={margin}
      ticker={ticker}
      buyingPower={buyingPower}
      totalBalance={totalBalance}
      netExposure={netExposure}
    />
  );
};
