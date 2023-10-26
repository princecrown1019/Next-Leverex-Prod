import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { SocketCloseStatus } from '~/types/socketTypes';
import { AppState, AppThunkDispatch } from '~/store/types';
import { socketAuthActions } from '~/store/SocketAuth/slice';

import { deviceKeysActions } from './slice';

const deviceKeysActionTypes = new Set([
  deviceKeysActions.loadDeviceKeysFulfilled.type,
  deviceKeysActions.loadDeviceKeysRejected.type,
  deviceKeysActions.revokeDeviceKeyFulfilled.type,
  deviceKeysActions.revokeDeviceKeyRejected.type
]);

export const createDeviceKeysMiddleware = () => {
  return ({ dispatch }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (deviceKeysActionTypes.has(action.type)) {
        dispatch(socketAuthActions.disconnect({ code: SocketCloseStatus.WITHOUT_RECONNECT }));
      }

      return next(action);
    };
  };
};
