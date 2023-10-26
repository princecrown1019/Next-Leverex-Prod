import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { ToastType } from '~/types/toastTypes';
import { AppState, AppThunkDispatch } from '~/store/types';
import { sessionActions } from '~/store/Session/slice';
import { tradeEstimationsActions } from '~/store/TradeEstimations/slice';
import { withdrawalsActions } from '~/store/Withdrawals/slice';

import { toastsActions } from './slice';

const ignoredActionTypes = new Set([
  sessionActions.authorizeRejected.type,
  sessionActions.loginUpgradedRejected.type,
  sessionActions.registerUpgradedRejected.type,
  tradeEstimationsActions.loadMaxTradeAmountRejected.type
]);

const authEidSignatureRequiredTypes = new Set([withdrawalsActions.withdrawFulfilled.type]);

export const createToastsMiddleware = () => {
  return ({ dispatch }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      // Creating toasts when receive rejected actions.
      if (
        (action.type.endsWith('Rejected') || action.type.endsWith('rejected')) &&
        action.payload &&
        !ignoredActionTypes.has(action.type)
      ) {
        dispatch(
          toastsActions.create({
            type: ToastType.ERROR,
            message: action.payload.errorMsg || action.payload || 'Something went wrong'
          })
        );
      }

      if (authEidSignatureRequiredTypes.has(action.type)) {
        dispatch(toastsActions.create({ type: ToastType.WARNING, message: 'Auth eID signature requested' }));
      }

      return next(action);
    };
  };
};
