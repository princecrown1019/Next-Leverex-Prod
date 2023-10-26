import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoggedIn } from '~/store/Session/selectors';
import { sessionActions } from '~/store/Session/slice';
import { withdrawalsActions } from '~/store/Withdrawals/slice';

export const useCancelPendingWithdrawalCommand = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);

  return useCallback(
    (id: string, requestId?: string) => {
      if (!loggedIn) return;

      if (requestId) {
        dispatch(sessionActions.cancelAuthEid({ requestId }));
      }

      dispatch(withdrawalsActions.cancelWithdrawal({ id }));
    },
    [loggedIn]
  );
};
