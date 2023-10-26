import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { WS_MAIN_URL } from '~/constants/configConstants';
import { SocketAuthEndpoint, SocketMainEndpoint } from '~/types/socketTypes';
import { AppState, AppThunkAction } from '~/store/types';
import { buildAuthSocketReq, buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';
// import { toISOFullDate } from '~/services/DateFormat/dateFormatService';
import { uploadCorporateData } from '~/services/Api/apiService';
import { selectSessionToken } from '~/store/Session/selectors';

import {
  AuthorizeReq,
  AuthorizeSocketReq,
  CancelAuthEidReq,
  CancelAuthEidSocketReq,
  ConfirmBasicReq,
  ConfirmBasicSocketReq,
  LoginBasicSocketReq,
  LoginUpgradedSocketReq,
  RefreshReq,
  RefreshSocketReq,
  RegisterBasicReq,
  RegisterBasicSocketReq,
  RegisterCorporateReq,
  RegisterCorporateSocketReq,
  RegisterUpgradedSocketReq,
  UploadCorporateFilesReq
} from './types';

export const registerBasicRequest = createAction<RegisterBasicSocketReq>('session/registerBasicRequestAuth');
export const registerBasic = ({ phone }: RegisterBasicReq): AppThunkAction => {
  const publicKey = {};
  const reqPayload = buildAuthSocketReq(SocketAuthEndpoint.REGISTER_BASIC, 'signup', { publicKey, phone: `+${phone}` });

  return (dispatch) => {
    dispatch(registerBasicRequest(reqPayload));
  };
};

export const confirmBasicRequest = createAction<ConfirmBasicSocketReq>('session/confirmBasicRequestAuth');
export const confirmBasic = (_: ConfirmBasicReq): AppThunkAction => {
  const signedCode = JSON.stringify({});
  const reqPayload = buildAuthSocketReq(SocketAuthEndpoint.CONFIRM_BASIC, 'signup', { signedCode });

  return (dispatch) => {
    dispatch(confirmBasicRequest(reqPayload));
  };
};

export const loginBasicRequest = createAction<LoginBasicSocketReq>('session/loginBasicRequestAuth');
export const loginBasic = (): AppThunkAction => {
  // const signPayload = { created: toISOFullDate(), service_url: WS_MAIN_URL, thumbprint: true };
  const signedChallenge = JSON.stringify({});
  const reqPayload = buildAuthSocketReq(SocketAuthEndpoint.LOG_IN_BASIC, 'login', { signedChallenge });

  return (dispatch) => {
    dispatch(loginBasicRequest(reqPayload));
  };
};

export const registerUpgradedRequest = createAction<RegisterUpgradedSocketReq>('session/registerUpgradedRequestAuth');
export const registerUpgraded = (): AppThunkAction => {
  const reqPayload = buildAuthSocketReq(SocketAuthEndpoint.REGISTER, 'signup', { serviceUrl: WS_MAIN_URL });

  return (dispatch) => {
    dispatch(registerUpgradedRequest(reqPayload));
  };
};

export const registerCorporateRequest = createAction<RegisterCorporateSocketReq>(
  'session/registerCorporateRequestAuth'
);
export const registerCorporate = ({ merkleRoot, companyName }: RegisterCorporateReq): AppThunkAction => {
  const reqPayload = buildAuthSocketReq(SocketAuthEndpoint.CORPORATE_REGISTER, 'signup', {
    serviceUrl: WS_MAIN_URL,
    validationData: { merkleRoot, companyName }
  });

  return (dispatch) => {
    dispatch(registerCorporateRequest(reqPayload));
  };
};

export const uploadCorporateFiles = createAsyncThunk<void, UploadCorporateFilesReq, { state: AppState }>(
  'session/uploadCorporateFilesRequestRest',
  async ({ form, certificate, additionalFile }: UploadCorporateFilesReq, { getState }) => {
    const accessToken = selectSessionToken(getState());
    if (!accessToken) return;

    const payload = { onboardingData: form, coiData: certificate, otherData: additionalFile };
    const res = await uploadCorporateData(accessToken, payload);

    return res;
  }
);

export const loginUpgradedRequest = createAction<LoginUpgradedSocketReq>('session/loginUpgradedRequestAuth');
export const loginUpgraded = (): AppThunkAction => {
  const reqPayload = buildAuthSocketReq(SocketAuthEndpoint.LOGIN, 'login', { serviceUrl: WS_MAIN_URL });

  return (dispatch) => {
    dispatch(loginUpgradedRequest(reqPayload));
  };
};

export const cancelAuthEidRequest = createAction<CancelAuthEidSocketReq>('session/cancelAuthEidRequestAuth');
export const cancelAuthEid = (payload: CancelAuthEidReq): AppThunkAction => {
  const reqPayload = buildAuthSocketReq(SocketAuthEndpoint.CANCEL_REQUEST, 'login', payload);

  return (dispatch) => {
    dispatch(cancelAuthEidRequest(reqPayload));
  };
};

export const refreshRequest = createAction<RefreshSocketReq>('session/refreshRequestAuth');
export const refresh = (payload: RefreshReq): AppThunkAction => {
  const reqPayload = buildAuthSocketReq(SocketAuthEndpoint.REFRESH_SESSION, 'login', payload);

  return (dispatch) => {
    dispatch(refreshRequest(reqPayload));
  };
};

export const authorizeRequest = createAction<AuthorizeSocketReq>('session/authorizeRequestMain');
export const authorize = (payload: AuthorizeReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.AUTHORIZE, payload);

  return (dispatch) => {
    dispatch(authorizeRequest(reqPayload));
  };
};
