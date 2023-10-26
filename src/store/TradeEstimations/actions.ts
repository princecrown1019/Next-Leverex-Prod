import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { AppThunkAction } from '~/store/types';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';

import {
  LoadEstimationReq,
  LoadImEstimationSocketReq,
  LoadMaxAmountReq,
  LoadMaxAmountSocketReq,
  LoadProductFeeReq,
  LoadProductFeeSocketReq
} from './types';

export const loadImEstimationRequest = createAction<LoadImEstimationSocketReq>(
  'tradeEstimations/loadImEstimationRequestMain'
);
export const loadImEstimation = ({ qty, ...payload }: LoadEstimationReq<number>): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_ESTIMATION_IM, { ...payload, qty: qty.toString() });

  return (dispatch) => {
    dispatch(loadImEstimationRequest(reqPayload));
  };
};

export const loadMaxTradeAmountRequest = createAction<LoadMaxAmountSocketReq>(
  'tradeEstimations/loadMaxTradeAmountRequestMain'
);
export const loadMaxTradeAmount = (payload: LoadMaxAmountReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_MAX_TRADE_AMOUNT, payload);

  return (dispatch) => {
    dispatch(loadMaxTradeAmountRequest(reqPayload));
  };
};

export const loadProductFeeRequest = createAction<LoadProductFeeSocketReq>(
  'tradeEstimations/loadProductFeeRequestMain'
);
export const loadProductFee = (payload: LoadProductFeeReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_PRODUCT_FEE, payload);

  return (dispatch) => {
    dispatch(loadProductFeeRequest(reqPayload));
  };
};
