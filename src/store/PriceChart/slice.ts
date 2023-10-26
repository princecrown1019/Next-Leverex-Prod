import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductType } from '~/types/productTypes';

import { PriceChartState, LoadTradesRes } from './types';
import { serializeCandles } from './serializer';
import { loadLastTwoCandles, loadCandlesRequest, loadCandles, loadLastTwoCandlesRequest } from './actions';

export const initialState: PriceChartState = {
  candles: [],
  timestampEnd: null,
  hasNext: true,
  interval: 0,
  productType: ProductType.BTC_USDT,

  loading: {
    candles: false,
    lastTwo: false
  },

  error: {
    candles: null,
    lastTwo: null
  }
};

const priceChartSlice = createSlice({
  name: 'priceCharts',
  initialState,
  reducers: {
    loadCandlesFulfilled: (state, { payload }: PayloadAction<LoadTradesRes>) => {
      state.loading.candles = false;
      state.hasNext = payload.candles.length % 200 === 0;
      state.timestampEnd = payload.candles[0]?.timestamp || null;

      state.candles = [
        ...serializeCandles(payload.candles, payload.productType),
        ...(payload.interval === state.interval && payload.productType === state.productType ? state.candles : [])
      ];

      state.interval = payload.interval;
      state.productType = payload.productType;
    },

    loadCandlesRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.candles = false;
      state.error.candles = payload;
    },

    loadLastTwoCandlesFulfilled: (state, { payload }: PayloadAction<LoadTradesRes>) => {
      state.loading.lastTwo = false;
      state.candles = [...state.candles.slice(0, -1), ...serializeCandles(payload.candles, payload.productType)];
    },

    loadLastTwoCandlesRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.lastTwo = false;
      state.error.lastTwo = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCandlesRequest.type, (state) => {
      state.loading.candles = true;
      state.error.candles = null;
    });

    builder.addCase(loadLastTwoCandlesRequest.type, (state) => {
      state.loading.lastTwo = true;
      state.error.lastTwo = null;
    });
  }
});

export const priceChartReducer = priceChartSlice.reducer;
export const priceChartActions = {
  ...priceChartSlice.actions,
  loadCandles,
  loadLastTwoCandles
};
