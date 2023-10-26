import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { depositsActions } from '~/store/Deposits/slice';

export const useResetDepositsDownloadCommand = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(depositsActions.resetDownload());
  }, []);
};
