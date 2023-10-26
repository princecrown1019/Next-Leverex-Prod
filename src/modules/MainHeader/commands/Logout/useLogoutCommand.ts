import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { sessionActions } from '~/store/Session/slice';

export const useLogoutCommand = (callback?: () => void) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(sessionActions.logout());
    callback?.();
  }, []);
};
