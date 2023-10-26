import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { AppThunkAction } from '~/store/types';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';

import {
  CreateOrderReq,
  CreateOrderSocketReq,
  LoadSessionOrdersReq,
  LoadSessionOrdersSocketReq,
  LoadOrdersReq,
  LoadOrdersSocketReq
} from './types';

export const loadSessionOrdersRequest = createAction<LoadSessionOrdersSocketReq>('orders/loadSessionOrdersRequestMain');
export const loadSessionOrders = (payload: LoadSessionOrdersReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_ORDERS, payload);

  return (dispatch) => {
    dispatch(loadSessionOrdersRequest(reqPayload));
  };
};

export const loadOrdersRequest = createAction<LoadOrdersSocketReq>('orders/loadAllOrdersRequestMain');
export const loadOrders = ({ limit = 30, offset = 0 }: LoadOrdersReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_TRADE_HISTORY, { limit, offset });

  return (dispatch) => {
    dispatch(loadOrdersRequest(reqPayload));
  };
};

export const createOrderRequest = createAction<CreateOrderSocketReq>('orders/createOrderRequestMain');
export const createOrder = ({ amount, userExpectedPrice, ...restPayload }: CreateOrderReq<number>): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.CREATE_MARKET_ORDER, {
    ...restPayload,
    amount: Math.abs(amount).toString(),
    userExpectedPrice: userExpectedPrice?.toString()
  });

  return (dispatch) => {
    dispatch(createOrderRequest(reqPayload));
  };
};
