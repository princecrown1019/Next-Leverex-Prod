import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { sessionActions } from '~/store/Session/slice';

export const useCancelAuthEidRequestCommand = (requestId: null | string) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    if (!requestId) return;

    dispatch(sessionActions.cancelAuthEid({ requestId }));
  }, [requestId]);
};
