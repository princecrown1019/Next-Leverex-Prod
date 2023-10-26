import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NotificationsState } from '~/store/Notifications/types';

import {
  rollNotification,
  tradeNotification,
  defaultNotification,
  liquidationNotification,
  withdrawalCancelledNotification,
  withdrawalExecutedNotification,
  withdrawalRequestedNotification,
  depositCreditedNotification,
  depositDetectedNotification,
  addressWhitelistedNotification,
  corporateAccountCreatedNotification
} from './actions';

export const initialState: NotificationsState = {
  allowed: null
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setAllowed: (state, { payload }: PayloadAction<boolean>) => {
      state.allowed = payload;
    }
  }
});

export const notificationsReducer = notificationsSlice.reducer;
export const notificationsActions = {
  ...notificationsSlice.actions,
  rollNotification,
  tradeNotification,
  defaultNotification,
  liquidationNotification,
  withdrawalCancelledNotification,
  withdrawalExecutedNotification,
  withdrawalRequestedNotification,
  depositCreditedNotification,
  depositDetectedNotification,
  addressWhitelistedNotification,
  corporateAccountCreatedNotification
};
