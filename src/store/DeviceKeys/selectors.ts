import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '~/store/types';

export const selectAllDeviceKeys = (state: AppState) => state.deviceKeys.deviceKeys;
export const selectDeviceKeysLoading = (state: AppState) => state.deviceKeys.loading.deviceKeys;
export const selectDeviceKeyRevokeLoading = (state: AppState) => state.deviceKeys.loading.revoke;

export const selectDeviceKeys = createSelector([selectAllDeviceKeys], (deviceKeys) =>
  deviceKeys.filter((key) => key.status)
);
