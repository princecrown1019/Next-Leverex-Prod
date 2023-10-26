import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectSocketMainConnected } from '~/store/SocketMain/selectors';
import { sessionActions } from '~/store/Session/slice';

export const useLoginUpgradedCommand = (option: boolean) => {
  const dispatch = useDispatch();

  const socketConnected = useSelector(selectSocketMainConnected);

  const login = useCallback(() => {
    if (!socketConnected) return;

    dispatch(sessionActions.loginUpgraded());
  }, [socketConnected]);

  useEffect(() => {
    if (!option) return;

    login();
  }, [option, login]);

  return login;
};
