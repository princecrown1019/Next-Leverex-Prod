import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';

import { selectSocketAuthConnected } from '~/store/SocketAuth/selectors';
import { sessionActions } from '~/store/Session/slice';

export const useMobileRegisterUpgradedCommand = (option: boolean) => {
  const dispatch = useDispatch();

  const authSocketConnected = useSelector(selectSocketAuthConnected);

  useEffect(() => {
    if (!isMobile || !authSocketConnected || !option) return;

    dispatch(sessionActions.registerUpgraded());
  }, [authSocketConnected, option]);
};
