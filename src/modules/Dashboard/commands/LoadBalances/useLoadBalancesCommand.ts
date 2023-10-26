import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoggedIn } from '~/store/Session/selectors';
import { balancesActions } from '~/store/Balances/slice';

export const useLoadBalancesCommand = (option: boolean) => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (!loggedIn || option) return;

    dispatch(balancesActions.loadBalances());
  }, [loggedIn]);
};
