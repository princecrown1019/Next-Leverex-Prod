import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { AppState, AppThunkDispatch } from '~/store/types';
import { notificationsActions } from '~/store/Notifications/slice';

import { addressesActions } from './slice';

export const createAddressesMiddleware = () => {
  return ({ dispatch }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (action.type === addressesActions.whitelistAddressFulfilled.type) {
        dispatch(notificationsActions.addressWhitelistedNotification(action.payload));
      }

      return next(action);
    };
  };
};
