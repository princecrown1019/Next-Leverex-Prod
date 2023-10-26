import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SocketMainState } from './types';

const initialState: SocketMainState = {
  connected: false,

  loading: true,

  error: null
};

const socketMainSlice = createSlice({
  name: 'socketMain',
  initialState,
  reducers: {
    connect: (state) => {
      state.loading = true;
    },

    connectFulfilled: (state) => {
      state.loading = false;
      state.connected = true;
    },

    disconnect: (state) => {
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

export const socketMainReducer = socketMainSlice.reducer;
export const socketMainActions = socketMainSlice.actions;
