import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deviceKeysActions } from '~/store/DeviceKeys/slice';
import { selectLoggedIn } from '~/store/Session/selectors';

export const useLoadDeviceKeysCommand = (option: boolean) => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (option || !loggedIn) return;

    dispatch(deviceKeysActions.loadDeviceKeys());
  }, [loggedIn]);
};
