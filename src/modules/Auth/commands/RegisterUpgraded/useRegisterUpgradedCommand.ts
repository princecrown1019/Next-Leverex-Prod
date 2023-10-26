import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sessionActions } from '~/store/Session/slice';
import { selectSocketMainConnected } from '~/store/SocketMain/selectors';

export const useRegisterUpgradedCommand = (option: boolean) => {
  const dispatch = useDispatch();

  const socketConnected = useSelector(selectSocketMainConnected);

  const register = useCallback(() => {
    if (!socketConnected) return;

    dispatch(sessionActions.registerUpgraded());
  }, [socketConnected]);

  useEffect(() => {
    if (!option) return;

    register();
  }, [option, register]);

  return register;
};
