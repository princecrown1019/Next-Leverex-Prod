import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectOrdersLoading } from '~/store/Orders/selectors';
import { selectBalances, selectBalancesLoading } from '~/store/Balances/selectors';
import {
  DashboardWrapperSummaryView,
  Props as ViewProps
} from '~/modules/Dashboard/views/WrapperSummary/WrapperSummaryView';

type Props = Pick<ViewProps, 'children'>;

export const DashboardWrapperSummaryContainer: FC<Props> = ({ children }) => {
  const loadingOrders = useSelector(selectOrdersLoading);
  const loadingBalances = useSelector(selectBalancesLoading);
  const balances = useSelector(selectBalances);

  const loading = loadingOrders || (loadingBalances && !balances.length);

  return <DashboardWrapperSummaryView loading={loading}>{children}</DashboardWrapperSummaryView>;
};
