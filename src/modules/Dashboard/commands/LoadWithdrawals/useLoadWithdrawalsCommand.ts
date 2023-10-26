import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoggedIn } from '~/store/Session/selectors';
import { withdrawalsActions } from '~/store/Withdrawals/slice';

export const useLoadWithdrawalsCommand = (option: boolean) => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (!loggedIn || option) return;

    dispatch(withdrawalsActions.loadWithdrawals());
  }, [loggedIn]);
};
