import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { RolloverType } from '~/types/orderTypes';
import { AppState, AppThunkDispatch } from '~/store/types';
import { notificationsActions } from '~/store/Notifications/slice';

import { ordersActions } from './slice';

export const createOrdersMiddleware = () => {
  return ({ dispatch }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (action.type === ordersActions.createOrderFulfilled.type) {
        if (action.payload.order.rolloverType === RolloverType.NOT_ROLLOVER) {
          dispatch(notificationsActions.tradeNotification(action.payload.order));
        }

        if (action.payload.order.rolloverType === RolloverType.LIQUIDATION) {
          dispatch(notificationsActions.liquidationNotification(action.payload.order));
        }

        if (action.payload.order.rolloverType === RolloverType.DEFAULT) {
          dispatch(notificationsActions.defaultNotification(action.payload.order));
        }
      }

      return next(action);
    };
  };
};
