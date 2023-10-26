import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddressesState, LoadAddressesRes, WhitelistRes, RemoveRes } from './types';
import { serializeAddress, serializeAddresses } from './serializer';
import {
  loadAddresses,
  loadAddressesRequest,
  whitelistAddress,
  whitelistAddressRequest,
  removeAddress,
  removeAddressRequest
} from './actions';

export const initialState: AddressesState = {
  addresses: [],

  loading: {
    addresses: false,
    whitelist: false,
    remove: false
  },

  error: {
    addresses: null,
    whitelist: null,
    remove: null
  }
};

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    loadAddressesFulfilled: (state, { payload }: PayloadAction<LoadAddressesRes>) => {
      state.loading.addresses = false;
      state.addresses = serializeAddresses(payload.addresses);
    },

    loadAddressesRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.addresses = false;
      state.error.addresses = payload;
    },

    whitelistAddressFulfilled: (state, { payload }: PayloadAction<WhitelistRes>) => {
      state.loading.whitelist = false;
      state.addresses.push(serializeAddress(payload));
    },

    whitelistAddressRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.whitelist = false;
      state.error.whitelist = payload;
    },

    removeAddressFulfilled: (state, { payload }: PayloadAction<RemoveRes>) => {
      state.loading.remove = false;
      state.addresses = state.addresses.filter((address) => address.address !== payload.address);
    },

    removeAddressRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.remove = false;
      state.error.remove = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadAddressesRequest.type, (state) => {
      state.loading.addresses = true;
      state.error.addresses = null;
    });

    builder.addCase(whitelistAddressRequest.type, (state) => {
      state.loading.whitelist = true;
      state.error.whitelist = null;
    });

    builder.addCase(removeAddressRequest.type, (state) => {
      state.loading.remove = true;
      state.error.remove = null;
    });
  }
});

export const addressesReducer = addressesSlice.reducer;
export const addressesActions = {
  ...addressesSlice.actions,
  loadAddresses,
  whitelistAddress,
  removeAddress
};
