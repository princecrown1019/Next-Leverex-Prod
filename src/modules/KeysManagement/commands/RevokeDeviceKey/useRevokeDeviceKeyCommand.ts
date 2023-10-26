import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { deviceKeysActions } from '~/store/DeviceKeys/slice';

export const useRevokeDeviceKeyCommand = (disabled: boolean) => {
  const dispatch = useDispatch();

  return useCallback(
    (kid: string) => {
      if (disabled) return;

      dispatch(deviceKeysActions.revokeDeviceKey({ kid }));
    },
    [disabled]
  );
};
