import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { supportedProducts } from '~/constants/productConstants';
import { AppState, AppThunkDispatch } from '~/store/types';
import { socketMainActions } from '~/store/SocketMain/slice';
import { notificationsActions } from '~/store/Notifications/slice';
import { marketActions } from '~/store/Market/slice';

import { statsActions } from './slice';

export const createStatsMiddleware = () => {
  return ({ dispatch }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      // Fetching the stats when main socket gets connected.
      if (action.type === socketMainActions.connectFulfilled.type) {
        for (const product of supportedProducts) {
          dispatch(statsActions.loadTradingStats({ productType: product.type }));
          dispatch(statsActions.loadSessionData({ productType: product.type }));
          dispatch(statsActions.loadVersionData());
        }
      }

      if (action.type === marketActions.changeProduct.type) {
        dispatch(statsActions.loadTradingStats({ productType: action.payload.productType }));
        dispatch(statsActions.loadSessionData({ productType: action.payload.productType }));
      }

      if (action.type === statsActions.closeSessionFulfilled.type) {
        dispatch(notificationsActions.rollNotification(action.payload.productType));
      }

      return next(action);
    };
  };
};
