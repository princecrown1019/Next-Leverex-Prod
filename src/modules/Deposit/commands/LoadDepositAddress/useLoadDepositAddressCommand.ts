import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoggedIn } from '~/store/Session/selectors';
import { depositsActions } from '~/store/Deposits/slice';

export const useLoadDepositAddressCommand = (option: boolean) => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (!loggedIn || option) return;

    dispatch(depositsActions.loadDepositAddress());
  }, [loggedIn]);
};
