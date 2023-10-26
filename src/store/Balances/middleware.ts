import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { AppState, AppThunkDispatch } from '~/store/types';
import { sessionActions } from '~/store/Session/slice';

import { balancesActions } from './slice';

export const createBalancesMiddleware = () => {
  return ({ dispatch }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      // Fetching balances when main socket gets connected.
      if (action.type === sessionActions.authorizeFulfilled.type) {
        dispatch(balancesActions.loadBalances());
      }

      return next(action);
    };
  };
};
