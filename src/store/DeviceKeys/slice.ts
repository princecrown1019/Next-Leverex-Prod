import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DeviceKeysState, DeviceKeysRes } from './types';
import { serializeDeviceKeys } from './serializer';
import { revokeDeviceKey, revokeDeviceKeyRequest, loadDeviceKeysRequest, loadDeviceKeys } from './actions';

export const initialState: DeviceKeysState = {
  deviceKeys: [],

  loading: {
    deviceKeys: false,
    revoke: false
  },

  error: {
    deviceKeys: null,
    revoke: null
  }
};

const deviceKeysSlice = createSlice({
  name: 'deviceKeys',
  initialState,
  reducers: {
    loadDeviceKeysFulfilled: (state, { payload }: PayloadAction<DeviceKeysRes>) => {
      state.loading.deviceKeys = false;
      state.deviceKeys = serializeDeviceKeys(payload);
    },

    loadDeviceKeysRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.deviceKeys = false;
      state.error.deviceKeys = payload;
    },

    revokeDeviceKeyFulfilled: (state, { payload }: PayloadAction<DeviceKeysRes>) => {
      state.loading.revoke = false;
      state.deviceKeys = serializeDeviceKeys(payload);
    },

    revokeDeviceKeyRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.revoke = false;
      state.error.revoke = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadDeviceKeysRequest.type, (state) => {
      state.loading.deviceKeys = true;
      state.error.deviceKeys = null;
    });

    builder.addCase(revokeDeviceKeyRequest.type, (state) => {
      state.loading.revoke = true;
      state.error.revoke = null;
    });
  }
});

export const deviceKeysReducer = deviceKeysSlice.reducer;
export const deviceKeysActions = {
  ...deviceKeysSlice.actions,
  loadDeviceKeys,
  revokeDeviceKey
};
