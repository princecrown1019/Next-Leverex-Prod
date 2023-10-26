import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { AppState, AppThunkDispatch } from '~/store/types';
import { selectProductType } from '~/store/Market/selectors';
import { selectLoggedIn } from '~/store/Session/selectors';
import { statsActions } from '~/store/Stats/slice';

import { profitsLossesActions } from './slice';

export const createProfitLossMiddleware = () => {
  return ({ dispatch, getState }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (action.type === statsActions.loadSessionDataFulfilled.type) {
        const state = getState();

        const loggedIn = selectLoggedIn(state);
        if (!loggedIn) return next(action);

        const productType = selectProductType(state);

        dispatch(profitsLossesActions.loadDay({ productType }));
        dispatch(profitsLossesActions.loadWeek({ productType }));
        dispatch(profitsLossesActions.loadMonth({ productType }));
        dispatch(profitsLossesActions.loadYear({ productType }));
        dispatch(profitsLossesActions.loadAllTime({ productType }));
      }

      return next(action);
    };
  };
};
