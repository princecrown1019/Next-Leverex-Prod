import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { AppState, AppThunkDispatch } from '~/store/types';
import { selectSocketMainConnected } from '~/store/SocketMain/selectors';
import { socketAuthActions } from '~/store/SocketAuth/slice';

import { socketMainActions } from './slice';

export const createSocketMainMiddleware = () => {
  return ({ dispatch, getState }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      // Connecting to the main socket when the auth one is ready.
      if (action.type === socketAuthActions.connectFulfilled.type) {
        const connected = selectSocketMainConnected(getState());
        if (connected) return next(action);

        dispatch(socketMainActions.connect());
      }

      return next(action);
    };
  };
};
