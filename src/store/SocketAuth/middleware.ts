import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { AppState, AppThunkDispatch } from '~/store/types';
import { socketAuthActions } from '~/store/SocketAuth/slice';

import { selectSocketAuthCallbackPayload, selectSocketAuthConnected } from './selectors';

export const createAuthSocketMiddleware = () => {
  return ({ dispatch, getState }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (action.type.endsWith('RequestAuth')) {
        const connected = selectSocketAuthConnected(getState());

        if (connected) {
          dispatch(socketAuthActions.send(action.payload));
        } else {
          dispatch(socketAuthActions.setCallbackPayload(action.payload));
          dispatch(socketAuthActions.connect());
        }
      }

      if (action.type === socketAuthActions.connectFulfilled.type) {
        const payload = selectSocketAuthCallbackPayload(getState());
        if (!payload) return next(action);

        dispatch(socketAuthActions.send(payload));
      }

      return next(action);
    };
  };
};
