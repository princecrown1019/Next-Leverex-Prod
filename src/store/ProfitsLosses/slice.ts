import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfitLossReference } from '~/types/profitLossTypes';
import { serializeProfitLoss } from '~/store/ProfitsLosses/serializer';

import { ProfitsLossesState, LoadPLRes, LoadPLRejectedRes } from './types';
import {
  loadDay,
  loadDayRequest,
  loadWeek,
  loadWeekRequest,
  loadMonth,
  loadMonthRequest,
  loadYear,
  loadYearRequest,
  loadAllTime,
  loadAllTimeRequest
} from './actions';

export const initialState: ProfitsLossesState = {
  [ProfitLossReference.DAY]: 0,
  [ProfitLossReference.WEEK]: 0,
  [ProfitLossReference.MONTH]: 0,
  [ProfitLossReference.YEAR]: 0,
  [ProfitLossReference.ALL_TIME]: 0,

  loading: {
    [ProfitLossReference.DAY]: false,
    [ProfitLossReference.WEEK]: false,
    [ProfitLossReference.MONTH]: false,
    [ProfitLossReference.YEAR]: false,
    [ProfitLossReference.ALL_TIME]: false
  },

  error: {
    [ProfitLossReference.DAY]: null,
    [ProfitLossReference.WEEK]: null,
    [ProfitLossReference.MONTH]: null,
    [ProfitLossReference.YEAR]: null,
    [ProfitLossReference.ALL_TIME]: null
  }
};

const profitsLossesSlice = createSlice({
  name: 'profitsLosses',
  initialState,
  reducers: {
    loadFulfilled: (state, { payload }: PayloadAction<LoadPLRes>) => {
      state.loading[payload.reference] = false;
      state[payload.reference] = serializeProfitLoss(payload.profitLoss);
    },

    loadRejected: (state, { payload }: PayloadAction<LoadPLRejectedRes>) => {
      state.loading[payload.reference] = false;
      state.error[payload.reference] = payload.errorMsg;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadDayRequest.type, (state) => {
      state.loading[ProfitLossReference.DAY] = true;
      state.error[ProfitLossReference.DAY] = null;
    });

    builder.addCase(loadWeekRequest.type, (state) => {
      state.loading[ProfitLossReference.WEEK] = true;
      state.error[ProfitLossReference.WEEK] = null;
    });

    builder.addCase(loadMonthRequest.type, (state) => {
      state.loading[ProfitLossReference.MONTH] = true;
      state.error[ProfitLossReference.MONTH] = null;
    });

    builder.addCase(loadYearRequest.type, (state) => {
      state.loading[ProfitLossReference.YEAR] = true;
      state.error[ProfitLossReference.YEAR] = null;
    });

    builder.addCase(loadAllTimeRequest.type, (state) => {
      state.loading[ProfitLossReference.ALL_TIME] = true;
      state.error[ProfitLossReference.ALL_TIME] = null;
    });
  }
});

export const profitsLossesReducer = profitsLossesSlice.reducer;
export const profitsLossesActions = {
  ...profitsLossesSlice.actions,
  loadDay,
  loadWeek,
  loadMonth,
  loadYear,
  loadAllTime
};
