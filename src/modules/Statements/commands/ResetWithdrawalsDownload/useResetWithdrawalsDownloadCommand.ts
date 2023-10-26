import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { withdrawalsActions } from '~/store/Withdrawals/slice';

export const useResetWithdrawalsDownloadCommand = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(withdrawalsActions.resetDownload());
  }, []);
};
