import { AppState } from '~/store/types';

export const selectSocketMainConnected = (state: AppState) => state.socketMain.connected;
export const selectSocketMainLoading = (state: AppState) => state.socketMain.loading;
