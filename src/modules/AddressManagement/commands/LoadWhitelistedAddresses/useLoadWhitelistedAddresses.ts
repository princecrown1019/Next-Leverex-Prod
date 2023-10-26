import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoggedIn } from '~/store/Session/selectors';
import { addressesActions } from '~/store/Addresses/slice';

export const useLoadWhitelistedAddresses = (option: boolean) => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (!loggedIn || option) return;

    dispatch(addressesActions.loadAddresses());
  }, [loggedIn]);
};
