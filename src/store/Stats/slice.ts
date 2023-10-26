import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductType } from '~/types/productTypes';

import { StatsState, LoadStatsRes, LoadDayRes, LoadVersionRes, TradingClosedRes } from './types';
import { serializeTradingDay, serializeTradingStats } from './serializer';
import {
  loadSessionData,
  loadSessionDataRequest,
  loadTradingStats,
  loadTradingStatsRequest,
  loadVersionData
} from './actions';

const getState = <T>(value: T) =>
  // eslint-disable-next-line unicorn/no-array-reduce
  Object.values(ProductType).reduce(
    (acc, productType) => ({
      ...acc,
      [productType]: value
    }),
    {} as { [P in ProductType]: T }
  );

export const initialState: StatsState = {
  lastCutOffPrice: getState(0),
  timeToCutOff: getState(0),
  nextCutOffAt: getState(0),
  dailyVolume: getState(0),
  openInterest: getState(0),

  closed: getState(true),

  loading: {
    sessionData: false,
    tradingStats: false
  },
  error: {
    sessionData: null,
    tradingStats: null
  },
  version: 'N/A'
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    loadVersionDataFulfilled: (state, { payload }: PayloadAction<LoadVersionRes>) => {
      state.version = payload.version;
    },

    loadSessionDataFulfilled: (state, { payload }: PayloadAction<LoadDayRes>) => {
      state.loading.sessionData = false;
      state.closed[payload.productType] = false;

      const { lastCutOffPrice, timeToCutOff, nextCutOffAt } = serializeTradingDay(payload);
      Object.assign(state.lastCutOffPrice, lastCutOffPrice);
      Object.assign(state.timeToCutOff, timeToCutOff);
      Object.assign(state.nextCutOffAt, nextCutOffAt);
    },

    loadSessionDataRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.sessionData = false;
      state.error.sessionData = payload;
    },

    loadTradingStatsFulfilled: (state, { payload }: PayloadAction<LoadStatsRes>) => {
      state.loading.tradingStats = false;

      const { openInterest, dailyVolume } = serializeTradingStats(payload);
      Object.assign(state.openInterest, openInterest);
      Object.assign(state.dailyVolume, dailyVolume);
    },

    loadTradingStatsRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.tradingStats = false;
      state.error.tradingStats = payload;
    },

    closeSessionFulfilled: (state, { payload }: PayloadAction<TradingClosedRes>) => {
      state.closed[payload.productType] = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadSessionDataRequest.type, (state) => {
      state.loading.sessionData = true;
      state.error.sessionData = null;
    });

    builder.addCase(loadTradingStatsRequest.type, (state) => {
      state.loading.tradingStats = true;
      state.error.tradingStats = null;
    });
  }
});

export const statsReducer = statsSlice.reducer;
export const statsActions = {
  ...statsSlice.actions,
  loadSessionData,
  loadTradingStats,
  loadVersionData
};
