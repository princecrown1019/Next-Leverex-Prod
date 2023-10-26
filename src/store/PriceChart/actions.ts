import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { AppThunkAction } from '~/store/types';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';
import { selectProductType } from '~/store/Market/selectors';
import { ChartReference } from '~/types/chartTypes';

import { LoadTradesReq, LoadTradesSocketReq } from './types';
import { selectPriceChartInterval, selectPriceChartProductType, selectPriceChartTimestampEnd } from './selectors';

export const loadCandlesRequest = createAction<LoadTradesSocketReq>('priceChart/loadCandlesRequestMain');
export const loadCandles = (payload: LoadTradesReq): AppThunkAction => {
  return (dispatch, getState) => {
    const state = getState();

    const interval = selectPriceChartInterval(state);
    const productType = selectProductType(state);
    const chartProductType = selectPriceChartProductType(state);
    const storeTimestampEnd = selectPriceChartTimestampEnd(state);

    const timestampEnd =
      interval === payload.interval && productType === chartProductType ? storeTimestampEnd : Date.now() / 1000;

    const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_OHLC, {
      ...payload,
      productType,
      timestampEnd: payload.timestampEnd || timestampEnd,
      count: 200,
      reference: ChartReference.ALL
    });

    dispatch(loadCandlesRequest(reqPayload));
  };
};

export const loadLastTwoCandlesRequest = createAction<LoadTradesSocketReq>('priceChart/loadLastTwoCandlesRequestMain');
export const loadLastTwoCandles = (payload: LoadTradesReq): AppThunkAction => {
  return (dispatch, getState) => {
    const productType = selectProductType(getState());

    const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_OHLC, {
      ...payload,
      productType,
      count: 2,
      reference: ChartReference.LAST_TWO
    });

    dispatch(loadLastTwoCandlesRequest(reqPayload));
  };
};
