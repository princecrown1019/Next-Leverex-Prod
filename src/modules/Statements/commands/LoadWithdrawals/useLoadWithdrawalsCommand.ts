import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { withdrawalsActions } from '~/store/Withdrawals/slice';

export const useLoadWithdrawalsCommand = () => {
  const dispatch = useDispatch();

  return useCallback((startTime: number, endTime: number) => {
    dispatch(withdrawalsActions.loadWithdrawalsForDownload({ startTime, endTime }));
  }, []);
};
