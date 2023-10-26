import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { generateRandomString } from '~/services/Random/randomService';

import { CreateReq, RemoveReq, ToastsState } from './types';

export const initialState: ToastsState = {
  toasts: []
};

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    create: (state, { payload }: PayloadAction<CreateReq>) => {
      state.toasts.push({ id: generateRandomString(), ...payload });
    },

    remove: (state, { payload }: PayloadAction<RemoveReq>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== payload.id);
    }
  }
});

export const toastsReducer = toastsSlice.reducer;
export const toastsActions = toastsSlice.actions;
