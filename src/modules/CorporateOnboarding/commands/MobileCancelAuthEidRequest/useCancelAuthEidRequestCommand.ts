import { useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';

import { sessionActions } from '~/store/Session/slice';

export const useMobileCancelAuthEidRequestCommand = (requestId: null | string) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    if (!requestId || !isMobile) return;

    dispatch(sessionActions.cancelAuthEid({ requestId }));
  }, [requestId]);
};
