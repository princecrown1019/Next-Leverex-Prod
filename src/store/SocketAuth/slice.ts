import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SocketAuthReq } from '~/types/socketTypes';

import { SocketAuthState, DisconnectReq } from './types';

const initialState: SocketAuthState = {
  connected: false,
  callbackPayload: null,

  loading: false,

  error: null
};

const socketAuthSlice = createSlice({
  name: 'socketAuth',
  initialState,
  reducers: {
    connect: (state) => {
      state.loading = true;
    },

    connectFulfilled: (state) => {
      state.loading = false;
      state.connected = true;
    },

    send: (state, { payload }: PayloadAction<SocketAuthReq>) => {
      if (payload.method === state.callbackPayload?.method && payload.api === state.callbackPayload?.api) {
        state.callbackPayload = null;
      }
    },

    setCallbackPayload: (state, action: PayloadAction<SocketAuthReq>) => {
      state.callbackPayload = action.payload;
    },

    disconnect: (state, _: PayloadAction<DisconnectReq>) => {
      state.connected = false;
    },

    disconnectFulfilled: (state) => {
      state.connected = false;
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    }
  }
});

export const socketAuthReducer = socketAuthSlice.reducer;
export const socketAuthActions = socketAuthSlice.actions;
