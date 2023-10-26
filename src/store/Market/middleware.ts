import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { supportedProducts } from '~/constants/productConstants';
import { AppState, AppThunkDispatch } from '~/store/types';
import { socketMainActions } from '~/store/SocketMain/slice';
import { selectProductType } from '~/store/Market/selectors';

import { marketActions } from './slice';

export const createMarketMiddleware = () => {
  return ({ dispatch, getState }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      // Subscribing to the products' prices when main socket gets connected.
      if (action.type === socketMainActions.connectFulfilled.type) {
        for (const product of supportedProducts) {
          dispatch(marketActions.subscribePrices({ productType: product.type }));
          dispatch(marketActions.loadSessionHealth({ productType: product.type }));
        }
      }

      if (action.type === marketActions.changeProduct.type) {
        const productType = selectProductType(getState());

        dispatch(marketActions.unsubscribeDealersOffers({ productType }));
      }

      return next(action);
    };
  };
};
