import { AppState } from '~/store/types';

export const selectSocketAuthConnected = (state: AppState) => state.socketAuth.connected;
export const selectSocketAuthCallbackPayload = (state: AppState) => state.socketAuth.callbackPayload;
