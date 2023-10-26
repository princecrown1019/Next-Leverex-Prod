import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FeesReference } from '~/types/feesTypes';

import { FeesHistoryState, LoadFeesRes } from './types';
import { loadAllTimeFeesRequest, loadTimeRangeFeesRequest, loadAllTimeFees, loadTimeRangeFees } from './actions';

export const initialState: FeesHistoryState = {
  [FeesReference.TIME_RANGE]: null,
  [FeesReference.ALL_TIME]: null,

  loading: {
    [FeesReference.TIME_RANGE]: false,
    [FeesReference.ALL_TIME]: false
  },

  error: {
    [FeesReference.TIME_RANGE]: null,
    [FeesReference.ALL_TIME]: null
  }
};

const feesHistorySlice = createSlice({
  name: 'feesHistory',
  initialState,
  reducers: {
    loadFeesHistoryFulfilled: (state, { payload }: PayloadAction<LoadFeesRes>) => {
      state.loading[payload.reference] = false;
      Object.assign(state, {
        [payload.reference]: {
          ...state[payload.reference],
          [payload.productType]: Number(payload.fees)
        }
      });
    },

    loadFeesHistoryRejected: (state, { payload }: PayloadAction<LoadFeesRes>) => {
      state.loading[payload.reference] = false;
      state.error[payload.reference] = payload.errorMsg;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllTimeFeesRequest.type, (state) => {
      state.loading[FeesReference.ALL_TIME] = true;
      state.error[FeesReference.ALL_TIME] = null;
    });

    builder.addCase(loadTimeRangeFeesRequest.type, (state) => {
      state.loading[FeesReference.TIME_RANGE] = true;
      state.error[FeesReference.TIME_RANGE] = null;
    });
  }
});

export const feesHistoryReducer = feesHistorySlice.reducer;
export const feesHistoryActions = {
  ...feesHistorySlice.actions,
  loadAllTimeFees,
  loadTimeRangeFees
};
