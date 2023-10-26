import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { AppState, AppThunkDispatch } from '~/store/types';
import { ToastType } from '~/types/toastTypes';
import { SocketCloseStatus } from '~/types/socketTypes';
import { AuthEidStatus } from '~/types/authEidTypes';
import {
  selectLastAuthorizeTime,
  selectSessionExpirationDate,
  selectSessionExpiresIn,
  selectSessionToken
} from '~/store/Session/selectors';
import { socketMainActions } from '~/store/SocketMain/slice';
import { toastsActions } from '~/store/Toasts/slice';
import { socketAuthActions } from '~/store/SocketAuth/slice';
import { notificationsActions } from '~/store/Notifications/slice';

import { serializeAuthEidError } from './serializer';
import { sessionActions } from './slice';

const REFRESH_LIFE_TIME = 10_000; // Ten seconds

const loginActionTypes = new Set([
  sessionActions.refreshFulfilled.type,
  sessionActions.loginBasicFulfilled.type,
  sessionActions.registerUpgradedFulfilled.type,
  sessionActions.registerCorporateFulfilled.type,
  sessionActions.loginUpgradedFulfilled.type
]);

export const createSessionMiddleware = () => {
  let refreshTimeout: null | NodeJS.Timeout = null;

  return ({ dispatch, getState }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      // Refreshing the session when main socket is connected.
      if (action.type === socketMainActions.connectFulfilled.type) {
        const state = getState();

        const accessToken = selectSessionToken(state);
        const lastAuthorizeTime = selectLastAuthorizeTime(state);
        if (!accessToken) return next(action);

        const expirationDate = selectSessionExpirationDate(state);
        if (!expirationDate || Date.now() >= expirationDate) {
          dispatch(sessionActions.refreshRejected('Session expired'));
          return next(action);
        }

        if (lastAuthorizeTime && Date.now() - lastAuthorizeTime < REFRESH_LIFE_TIME) {
          dispatch(sessionActions.authorize({ token: accessToken }));
        } else {
          dispatch(sessionActions.refresh({ accessToken }));
        }
      }

      if (
        action.type === sessionActions.updateRegisterAuthEidStatus.type &&
        action.payload.status === AuthEidStatus.TIMEOUT
      ) {
        dispatch(sessionActions.registerUpgraded());
      }

      if (
        action.type === sessionActions.updateLoginAuthEidStatus.type &&
        action.payload.status === AuthEidStatus.TIMEOUT
      ) {
        dispatch(sessionActions.loginUpgraded());
      }

      if (
        action.type === sessionActions.updateRegisterAuthEidStatus.type ||
        action.type === sessionActions.updateLoginAuthEidStatus.type
      ) {
        const message = serializeAuthEidError(action.payload.status);
        if (message) {
          dispatch(toastsActions.create({ type: ToastType.ERROR, message }));
        }
      }

      if (action.type === sessionActions.loginUpgradedRejected.type) {
        dispatch(
          toastsActions.create({
            type: ToastType.ERROR,
            message: 'Account not found, please register'
          })
        );
      }

      if (action.type === sessionActions.registerUpgradedRejected.type) {
        dispatch(
          toastsActions.create({
            type: ToastType.ERROR,
            message: 'Account already registered'
          })
        );
      }

      if (action.type === sessionActions.uploadCorporateFiles.fulfilled.type) {
        dispatch(notificationsActions.corporateAccountCreatedNotification());
      }

      // Sending authorize req to the main socket when session is created by the auth session.
      if (loginActionTypes.has(action.type)) {
        dispatch(socketAuthActions.disconnect({ code: SocketCloseStatus.WITHOUT_RECONNECT }));
        dispatch(sessionActions.authorize({ token: action.payload.accessToken }));
      }

      // Refreshing session each "expiresIn" ms.
      if (action.type === sessionActions.authorizeFulfilled.type) {
        if (refreshTimeout) clearTimeout(refreshTimeout);
        const state = getState();

        const accessToken = selectSessionToken(state);
        if (!accessToken) return next(action);

        const expiresIn = selectSessionExpiresIn(state);
        refreshTimeout = setTimeout(() => {
          dispatch(sessionActions.refresh({ accessToken }));
        }, expiresIn);
      }

      return next(action);
    };
  };
};
