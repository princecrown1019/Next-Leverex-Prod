import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { AppState, AppThunkDispatch } from '~/store/types';
import { marketActions } from '~/store/Market/slice';
import { loadAllTimeFees } from '~/store/FeesHistory/actions';

export const createFeesHistoryMiddleware = () => {
  return ({ dispatch }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (action.type === marketActions.changeProduct.type) {
        dispatch(loadAllTimeFees({ productType: action.payload.productType }));
      }

      return next(action);
    };
  };
};
