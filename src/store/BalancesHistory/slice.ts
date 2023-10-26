import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BalancesHistoryState, LoadTimeRangeBalancesRes } from './types';
import { loadBalancesHistory, loadBalancesHistoryRequest } from './actions';
import { serializeTimeRangeBalances } from './serializer';

export const initialState: BalancesHistoryState = {
  openingBalance: 0,
  closingBalance: 0,

  loading: {
    balances: false
  },

  error: {
    balances: null
  }
};

const balancesHistorySlice = createSlice({
  name: 'balancesHistory',
  initialState,
  reducers: {
    loadBalancesHistoryFulfilled: (state, { payload }: PayloadAction<LoadTimeRangeBalancesRes>) => {
      state.loading.balances = false;
      Object.assign(state, serializeTimeRangeBalances(payload));
    },

    loadBalancesHistoryRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.balances = false;
      state.error.balances = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadBalancesHistoryRequest.type, (state) => {
      state.loading.balances = true;
      state.error.balances = null;
      state.openingBalance = 0;
      state.closingBalance = 0;
    });
  }
});

export const balancesHistoryReducer = balancesHistorySlice.reducer;
export const balancesHistoryActions = {
  ...balancesHistorySlice.actions,
  loadBalancesHistory
};
