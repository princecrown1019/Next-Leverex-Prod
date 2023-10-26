import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DepositsReference } from '~/types/depositsTypes';

import { DepositsState, LoadDepositsRes, UpdateDepositRes, LoadDepositAddressRes } from './types';
import { serializeDeposit, serializeDeposits } from './serializer';
import {
  loadDepositAddress,
  loadDepositsRequest,
  loadDepositAddressRequest,
  loadDeposits,
  loadDepositsForDownloadRequest,
  loadDepositsForDownload
} from './actions';

export const initialState: DepositsState = {
  deposits: [],
  depositAddress: null,

  [DepositsReference.DOWNLOAD]: [],

  loading: {
    deposits: false,
    depositAddress: false,
    [DepositsReference.DOWNLOAD]: false
  },

  error: {
    deposits: null,
    depositAddress: null,
    [DepositsReference.DOWNLOAD]: null
  }
};

const depositsSlice = createSlice({
  name: 'deposits',
  initialState,
  reducers: {
    loadDepositsFulfilled: (state, { payload }: PayloadAction<LoadDepositsRes>) => {
      state.loading.deposits = false;
      state.deposits = serializeDeposits(payload.deposits);
    },

    loadDepositsRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.deposits = false;
      state.error.deposits = payload;
    },

    loadDepositsForDownloadFulfilled: (state, { payload }: PayloadAction<LoadDepositsRes>) => {
      state.loading[DepositsReference.DOWNLOAD] = false;
      state[DepositsReference.DOWNLOAD] = serializeDeposits(payload.deposits);
    },

    loadDepositsForDownloadRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading[DepositsReference.DOWNLOAD] = false;
      state.error[DepositsReference.DOWNLOAD] = payload;
    },

    updateDeposit: (state, { payload }: PayloadAction<UpdateDepositRes>) => {
      const existingDeposit = state.deposits.find((deposit) => deposit.txId === payload.txId);
      const serializedDeposit = serializeDeposit(payload);

      // eslint-disable-next-line unicorn/prefer-ternary
      if (existingDeposit) {
        state.deposits = state.deposits.map((deposit) => {
          return deposit.txId === payload.txId ? { ...deposit, ...serializedDeposit } : deposit;
        });
      } else {
        state.deposits = [serializedDeposit, ...state.deposits];
      }
    },

    loadDepositAddressFulfilled: (state, { payload }: PayloadAction<LoadDepositAddressRes>) => {
      state.loading.depositAddress = false;
      state.depositAddress = payload.address;
    },

    loadDepositAddressRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.depositAddress = false;
      state.error.depositAddress = payload;
    },

    resetDownload: (state) => {
      state[DepositsReference.DOWNLOAD] = [];
      state.loading[DepositsReference.DOWNLOAD] = false;
      state.error[DepositsReference.DOWNLOAD] = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadDepositsRequest.type, (state) => {
      state.loading.deposits = true;
      state.error.deposits = null;
    });

    builder.addCase(loadDepositsForDownloadRequest.type, (state) => {
      state.loading[DepositsReference.DOWNLOAD] = true;
      state.error[DepositsReference.DOWNLOAD] = null;
    });

    builder.addCase(loadDepositAddressRequest.type, (state) => {
      state.loading.depositAddress = true;
      state.error.depositAddress = null;
    });
  }
});

export const depositsReducer = depositsSlice.reducer;
export const depositsActions = {
  ...depositsSlice.actions,
  loadDepositAddress,
  loadDepositsForDownload,
  loadDeposits
};
