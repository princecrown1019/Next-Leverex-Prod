import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { balancesHistoryActions } from '~/store/BalancesHistory/slice';

export const useLoadBalancesHistoryCommand = () => {
  const dispatch = useDispatch();

  return useCallback((startTime: number, endTime?: number) => {
    dispatch(balancesHistoryActions.loadBalancesHistory({ startTime, endTime }));
  }, []);
};
