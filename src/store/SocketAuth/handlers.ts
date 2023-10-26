import { Dispatch } from '@reduxjs/toolkit';

import { SocketAuthEndpoint, SocketAuthRes } from '~/types/socketTypes';
import { sessionActions } from '~/store/Session/slice';
import { deviceKeysActions } from '~/store/DeviceKeys/slice';

import { Handlers } from './types';

const authSocketExternalHandler: Handlers = {
  [SocketAuthEndpoint.REGISTER_BASIC]: [sessionActions.registerBasicFulfilled, sessionActions.registerBasicRejected],
  [SocketAuthEndpoint.CONFIRM_BASIC]: [sessionActions.confirmBasicFulfilled, sessionActions.confirmBasicRejected],

  [SocketAuthEndpoint.LOG_IN_BASIC]: [sessionActions.loginBasicFulfilled, sessionActions.loginBasicRejected],

  [SocketAuthEndpoint.REGISTER]: [sessionActions.updateRegisterRequestId, sessionActions.registerUpgradedRejected],
  [SocketAuthEndpoint.REGISTER_STATUS]: [
    sessionActions.updateRegisterAuthEidStatus,
    sessionActions.registerUpgradedRejected
  ],
  [SocketAuthEndpoint.REGISTER_COMPLETE]: [
    sessionActions.registerUpgradedFulfilled,
    sessionActions.registerUpgradedRejected
  ],

  [SocketAuthEndpoint.CORPORATE_REGISTER]: [
    sessionActions.updateRegisterCorporateRequestId,
    sessionActions.registerCorporateRejected
  ],
  [SocketAuthEndpoint.CORPORATE_REGISTER_STATUS]: [
    sessionActions.updateRegisterCorporateAuthEidStatus,
    sessionActions.registerCorporateRejected
  ],
  [SocketAuthEndpoint.CORPORATE_REGISTER_COMPLETE]: [
    sessionActions.registerCorporateFulfilled,
    sessionActions.registerCorporateRejected
  ],

  [SocketAuthEndpoint.LOGIN]: [sessionActions.updateLoginRequestId, sessionActions.loginUpgradedRejected],
  [SocketAuthEndpoint.LOGIN_STATUS]: [sessionActions.updateLoginAuthEidStatus, sessionActions.loginUpgradedRejected],
  [SocketAuthEndpoint.LOGIN_COMPLETE]: [sessionActions.loginUpgradedFulfilled, sessionActions.loginUpgradedRejected],

  [SocketAuthEndpoint.REFRESH_SESSION]: [sessionActions.refreshFulfilled, sessionActions.refreshRejected],

  [SocketAuthEndpoint.CANCEL_REQUEST]: [null, null],

  [SocketAuthEndpoint.LOAD_DEVICE_KEYS]: [
    deviceKeysActions.loadDeviceKeysFulfilled,
    deviceKeysActions.loadDeviceKeysRejected
  ],
  [SocketAuthEndpoint.REVOKE_DEVICE_KEY]: [
    deviceKeysActions.revokeDeviceKeyFulfilled,
    deviceKeysActions.revokeDeviceKeyRejected
  ]
};

export const handleMessage = (res: SocketAuthRes, dispatch: Dispatch) => {
  const { error, data, method } = res;
  if (!authSocketExternalHandler[method]) return;

  const [success, failure] = authSocketExternalHandler[method];

  if (error && failure) {
    const errorMsg = typeof error === 'number' ? 'Something went wrong' : error;

    dispatch(failure(errorMsg));
  } else if (!error && success) {
    dispatch(success(data));
  }
};
