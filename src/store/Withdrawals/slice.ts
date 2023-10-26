import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WithdrawalsReference, WithdrawalStatus } from '~/types/withdrawalsTypes';

import { CancelWithdrawalReq, WithdrawalsState, LoadWithdrawalsRes, WithdrawalRes, UpdateWithdrawalRes } from './types';
import { serializeWithdrawal, serializeWithdrawals } from './serializer';
import {
  cancelWithdrawal,
  cancelWithdrawalRequest,
  loadWithdrawals,
  loadWithdrawalsRequest,
  loadWithdrawalsForDownload,
  loadWithdrawalsForDownloadRequest,
  withdraw,
  withdrawRequest
} from './actions';

export const initialState: WithdrawalsState = {
  withdrawals: [],
  cancellingIds: [],

  [WithdrawalsReference.DOWNLOAD]: [],

  loading: {
    withdrawals: false,
    withdrawal: false,
    [WithdrawalsReference.DOWNLOAD]: false
  },

  error: {
    withdrawals: null,
    withdrawal: null,
    [WithdrawalsReference.DOWNLOAD]: null
  }
};

const withdrawalsSlice = createSlice({
  name: 'withdrawals',
  initialState,
  reducers: {
    loadWithdrawalsFulfilled: (state, { payload }: PayloadAction<LoadWithdrawalsRes>) => {
      state.loading.withdrawals = false;
      state.withdrawals = serializeWithdrawals(payload.withdrawals);
    },

    loadWithdrawalsRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.withdrawals = false;
      state.error.withdrawals = payload;
    },

    loadWithdrawalsForDownloadFulfilled: (state, { payload }: PayloadAction<LoadWithdrawalsRes>) => {
      state.loading[WithdrawalsReference.DOWNLOAD] = false;
      state[WithdrawalsReference.DOWNLOAD] = serializeWithdrawals(payload.withdrawals);
    },

    loadWithdrawalsForDownloadRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading[WithdrawalsReference.DOWNLOAD] = false;
      state.error[WithdrawalsReference.DOWNLOAD] = payload;
    },

    withdrawFulfilled: (state, { payload }: PayloadAction<WithdrawalRes>) => {
      state.loading.withdrawal = false;
      state.withdrawals = [serializeWithdrawal(payload), ...state.withdrawals];
    },

    withdrawRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.withdrawal = false;
      state.error.withdrawal = payload;
    },

    updateWithdrawal: (state, { payload }: PayloadAction<UpdateWithdrawalRes>) => {
      if (payload.status === WithdrawalStatus.CANCELLED) {
        state.cancellingIds = state.cancellingIds.filter((id) => id !== payload.id);
      }

      state.withdrawals = state.withdrawals.map((withdrawal) => {
        if (payload.id) {
          return withdrawal.id === payload.id ? { ...withdrawal, ...serializeWithdrawal(payload) } : withdrawal;
        }

        if (payload.txId) {
          return withdrawal.txId === payload.txId ? { ...withdrawal, ...serializeWithdrawal(payload) } : withdrawal;
        }

        return withdrawal;
      });
    },

    resetDownload: (state) => {
      state[WithdrawalsReference.DOWNLOAD] = [];
      state.loading[WithdrawalsReference.DOWNLOAD] = false;
      state.error[WithdrawalsReference.DOWNLOAD] = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadWithdrawalsRequest.type, (state) => {
      state.loading.withdrawals = true;
      state.error.withdrawals = null;
    });

    builder.addCase(loadWithdrawalsForDownloadRequest.type, (state) => {
      state.loading[WithdrawalsReference.DOWNLOAD] = true;
      state.error[WithdrawalsReference.DOWNLOAD] = null;
    });

    builder.addCase(withdrawRequest.type, (state) => {
      state.loading.withdrawal = true;
      state.error.withdrawal = null;
    });

    builder.addCase(cancelWithdrawalRequest.type, (state, action: PayloadAction<CancelWithdrawalReq>) => {
      state.cancellingIds.push(action.payload.id);
    });
  }
});

export const withdrawalsReducer = withdrawalsSlice.reducer;
export const withdrawalsActions = {
  ...withdrawalsSlice.actions,
  loadWithdrawals,
  loadWithdrawalsForDownload,
  withdraw,
  cancelWithdrawal
};
