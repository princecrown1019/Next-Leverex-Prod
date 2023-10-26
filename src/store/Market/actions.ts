import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { AppThunkAction } from '~/store/types';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';

import {
  CommonReq,
  LoadSessionHealthSocketReq,
  SubscribeDealersOffersSocketReq,
  SubscribePricesSocketReq,
  UnsubscribeDealersOffersSocketReq,
  UnsubscribePricesSocketReq
} from './types';

export const subscribePricesRequest = createAction<SubscribePricesSocketReq>('market/subscribePricesRequestMain');
export const subscribePrices = (payload: CommonReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.SUBSCRIBE_MARKET_DATA, payload);

  return (dispatch) => {
    dispatch(subscribePricesRequest(reqPayload));
  };
};

export const unsubscribePricesRequest = createAction<UnsubscribePricesSocketReq>('market/unsubscribePricesRequestMain');
export const unsubscribePrices = (payload: CommonReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.UNSUBSCRIBE_MARKET_DATA, payload);

  return (dispatch) => {
    dispatch(unsubscribePricesRequest(reqPayload));
  };
};

export const subscribeDealersOffersRequest = createAction<SubscribeDealersOffersSocketReq>(
  'market/subscribeDealersOffersRequestMain'
);
export const subscribeDealersOffers = (payload: CommonReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.SUBSCRIBE_DEALER_OFFERS, payload);

  return (dispatch) => {
    dispatch(subscribeDealersOffersRequest(reqPayload));
  };
};

export const unsubscribeDealersOffersRequest = createAction<UnsubscribeDealersOffersSocketReq>(
  'market/unsubscribeDealersOffersRequestMain'
);
export const unsubscribeDealersOffers = (payload: CommonReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.UNSUBSCRIBE_DEALER_OFFERS, payload);

  return (dispatch) => {
    dispatch(unsubscribeDealersOffersRequest(reqPayload));
  };
};

export const loadSessionHealthRequest = createAction<LoadSessionHealthSocketReq>('market/loadSessionHealthRequestMain');
export const loadSessionHealth = (payload: CommonReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_SESSION_HEALTH, payload);

  return (dispatch) => {
    dispatch(loadSessionHealthRequest(reqPayload));
  };
};
