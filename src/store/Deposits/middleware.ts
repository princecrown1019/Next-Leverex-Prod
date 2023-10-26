import { AnyAction, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';

import { AppState, AppThunkDispatch } from '~/store/types';
import { notificationsActions } from '~/store/Notifications/slice';

import { UpdateDepositRes } from './types';
import { depositsActions } from './slice';

export const createDepositsMiddleware = () => {
  return ({ dispatch }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: PayloadAction<UpdateDepositRes>) => {
      if (action.type === depositsActions.updateDeposit.type) {
        if (action.payload.nbConf === 0) {
          dispatch(notificationsActions.depositDetectedNotification(action.payload));
        }

        if (action.payload.nbConf === 2) {
          dispatch(notificationsActions.depositCreditedNotification(action.payload));
        }
      }

      return next(action);
    };
  };
};
