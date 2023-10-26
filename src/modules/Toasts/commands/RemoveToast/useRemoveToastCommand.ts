import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { toastsActions } from '~/store/Toasts/slice';

export const useRemoveToastCommand = () => {
  const dispatch = useDispatch();

  return useCallback((id: string) => {
    dispatch(toastsActions.remove({ id }));
  }, []);
};
