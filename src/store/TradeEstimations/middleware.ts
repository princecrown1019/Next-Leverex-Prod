import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { supportedProducts } from '~/constants/productConstants';
import { ProductSide } from '~/types/productTypes';
import { AppState, AppThunkDispatch } from '~/store/types';
import { selectLoggedIn } from '~/store/Session/selectors';
import { selectBuyingPower } from '~/store/Balances/selectors';
import { statsActions } from '~/store/Stats/slice';
import { balancesActions } from '~/store/Balances/slice';

import { tradeEstimationsActions } from './slice';

const loadMaxAmountTriggers = new Set([
  statsActions.loadSessionDataFulfilled.type,
  balancesActions.loadBalancesFulfilled.type
]);

export const createTradeEstimationsMiddleware = () => {
  return ({ dispatch, getState }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (loadMaxAmountTriggers.has(action.type)) {
        const state = getState();

        const loggedIn = selectLoggedIn(state);
        const buyingPower = selectBuyingPower(state);
        if (!loggedIn || !buyingPower) return next(action);

        for (const product of supportedProducts) {
          dispatch(tradeEstimationsActions.loadMaxTradeAmount({ side: ProductSide.SELL, productType: product.type }));
          dispatch(tradeEstimationsActions.loadMaxTradeAmount({ side: ProductSide.BUY, productType: product.type }));
        }
      }

      return next(action);
    };
  };
};
