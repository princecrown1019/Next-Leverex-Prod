import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { depositsActions } from '~/store/Deposits/slice';

export const useLoadDepositsCommand = () => {
  const dispatch = useDispatch();

  return useCallback((startTime: number, endTime: number) => {
    dispatch(depositsActions.loadDepositsForDownload({ startTime, endTime }));
  }, []);
};
