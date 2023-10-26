import { createAction } from '@reduxjs/toolkit';

import { SocketAuthEndpoint } from '~/types/socketTypes';
import { AppThunkAction } from '~/store/types';
import { buildAuthSocketReq } from '~/services/SocketFormat/socketFormatService';
import { selectSessionToken } from '~/store/Session/selectors';

import { LoadDeviceKeysSocketReq, RevokeDeviceKeyReq, RevokeDeviceKeySocketReq } from './types';

export const loadDeviceKeysRequest = createAction<LoadDeviceKeysSocketReq>('deviceKeys/loadDeviceKeysRequestAuth');
export const loadDeviceKeys = (): AppThunkAction => {
  return (dispatch, getState) => {
    const accessToken = selectSessionToken(getState());
    if (!accessToken) return;

    const reqPayload = buildAuthSocketReq(SocketAuthEndpoint.LOAD_DEVICE_KEYS, 'admin', { accessToken });

    dispatch(loadDeviceKeysRequest(reqPayload));
  };
};

export const revokeDeviceKeyRequest = createAction<RevokeDeviceKeySocketReq>('deviceKeys/revokeDeviceKeyRequestAuth');
export const revokeDeviceKey = (payload: RevokeDeviceKeyReq): AppThunkAction => {
  return (dispatch, getState) => {
    const accessToken = selectSessionToken(getState());
    if (!accessToken) return;

    const reqPayload = buildAuthSocketReq(SocketAuthEndpoint.REVOKE_DEVICE_KEY, 'admin', { ...payload, accessToken });

    dispatch(revokeDeviceKeyRequest(reqPayload));
  };
};
