import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { WithdrawalStatus } from '~/types/withdrawalsTypes';
import { AppState, AppThunkDispatch } from '~/store/types';
import { notificationsActions } from '~/store/Notifications/slice';

import { withdrawalsActions } from './slice';

export const createWithdrawalsMiddleware = () => {
  return ({ dispatch }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (action.type === withdrawalsActions.updateWithdrawal.type) {
        if (action.payload.status === WithdrawalStatus.PENDING) {
          dispatch(notificationsActions.withdrawalRequestedNotification(action.payload));
        }

        if (action.payload.status === WithdrawalStatus.CANCELLED) {
          dispatch(notificationsActions.withdrawalCancelledNotification(action.payload));
        }

        if (action.payload.status === WithdrawalStatus.COMPLETED && action.payload.nbConfs === 2) {
          dispatch(notificationsActions.withdrawalExecutedNotification(action.payload));
        }
      }

      return next(action);
    };
  };
};
