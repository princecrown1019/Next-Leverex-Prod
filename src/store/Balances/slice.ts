import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BalancesState, BalancesRes } from './types';
import { serializeBalances } from './serializer';
import { loadBalances, loadBalancesRequest } from './actions';

export const initialState: BalancesState = {
  balances: [],

  loading: true,

  error: null
};

const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    loadBalancesFulfilled: (state, { payload }: PayloadAction<BalancesRes>) => {
      state.loading = false;
      state.balances = serializeBalances(state.balances, payload);
    },

    loadBalancesRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadBalancesRequest.type, (state) => {
      state.loading = true;
      state.error = null;
    });
  }
});

export const balancesReducer = balancesSlice.reducer;
export const balancesActions = {
  ...balancesSlice.actions,
  loadBalances
};
