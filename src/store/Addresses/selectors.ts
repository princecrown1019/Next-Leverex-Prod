import { AppState } from '~/store/types';

export const selectWhitelistedAddresses = (state: AppState) => state.addresses.addresses;
export const selectAddressesLoading = (state: AppState) => state.addresses.loading.addresses;
export const selectWhitelistAddressLoading = (state: AppState) => state.addresses.loading.whitelist;
export const selectWhitelistAddressError = (state: AppState) => state.addresses.error.whitelist;
export const selectRemoveAddressLoading = (state: AppState) => state.addresses.loading.remove;
export const selectRemoveAddressError = (state: AppState) => state.addresses.error.remove;
