import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '~/store/types';
import { serializeAuthEidRequestUrl } from '~/store/Session/serializer';

export const selectLoggedIn = (state: AppState) => state.session.loggedIn;
export const selectSessionToken = (state: AppState) => state.session.token?.value;
export const selectAccountCreatedTimestamp = (state: AppState) => state.session.accountCreatedTime;
export const selectLastAuthorizeTime = (state: AppState) => state.session.lastAuthorizeTime;
export const selectSessionExpiresIn = (state: AppState) => state.session.token?.expiresIn;
export const selectSessionExpirationDate = (state: AppState) => state.session.token?.expirationDate;
export const selectRegisterBasicLoading = (state: AppState) => state.session.loading.registerBasic;
export const selectRefreshSessionLoading = (state: AppState) => state.session.loading.refresh;
export const selectAuthorizeSessionLoading = (state: AppState) => state.session.loading.authorize;
export const selectRegisterBasicError = (state: AppState) => state.session.error.registerBasic;
export const selectConfirmBasicLoading = (state: AppState) => state.session.loading.confirmBasic;
export const selectConfirmBasicError = (state: AppState) => state.session.error.confirmBasic;
export const selectLoginBasicLoading = (state: AppState) => state.session.loading.loginBasic;
export const selectLoginBasicError = (state: AppState) => state.session.error.loginBasic;
export const selectRegisterUpgradedLoading = (state: AppState) => state.session.loading.registerUpgraded;
export const selectRegisterUpgradedError = (state: AppState) => state.session.error.registerUpgraded;
export const selectLoginUpgradedLoading = (state: AppState) => state.session.loading.loginUpgraded;
export const selectLoginUpgradedError = (state: AppState) => state.session.error.loginUpgraded;
export const selectSignatureLoading = (state: AppState) => state.session.loading.signature;
export const selectLoginRequestId = (state: AppState) => state.session.loginRequestId;
export const selectRegisterRequestId = (state: AppState) => state.session.registerRequestId;
export const selectRegisterCorporateRequestId = (state: AppState) => state.session.corporateRequestId;
export const selectRegisterCorporateLoading = (state: AppState) => state.session.loading.registerCorporate;
export const selectRegisterCorporateError = (state: AppState) => state.session.error.registerCorporate;
export const selectUploadCorporateFilesLoading = (state: AppState) => state.session.loading.uploadCorporateFiles;
export const selectUploadCorporateFilesError = (state: AppState) => state.session.error.uploadCorporateFiles;
export const selectCorporateMerkleRoot = (state: AppState) => state.session.corporateMerkleRoot;

export const selectLoggedInUI = createSelector(
  [selectSessionToken, selectSessionExpirationDate],
  (token, expirationDate) => {
    return !!token && !!expirationDate && Date.now() < expirationDate;
  }
);

export const selectLoginUrl = createSelector([selectLoginRequestId], (requestId) => {
  return requestId ? serializeAuthEidRequestUrl(requestId) : null;
});

export const selectRegisterUrl = createSelector([selectRegisterRequestId], (requestId) => {
  return requestId ? serializeAuthEidRequestUrl(requestId) : null;
});

export const selectRegisterCorporateUrl = createSelector([selectRegisterCorporateRequestId], (requestId) => {
  return requestId ? serializeAuthEidRequestUrl(requestId) : null;
});

export const selectAccountCreatedDate = createSelector([selectAccountCreatedTimestamp], (timestamp) => {
  if (!timestamp) return null;

  return new Date(timestamp);
});
