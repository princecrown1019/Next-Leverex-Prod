import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthEidStatus } from '~/types/authEidTypes';

import {
  AuthEidIdRes,
  AuthorizeRes,
  LoginRes,
  RefreshRes,
  RegisterCorporateSocketReq,
  SessionState,
  UpgradedStatusRes
} from './types';
import { serializeAccountCreatedTimestamp, serializeAuthEidError, serializeToken } from './serializer';
import {
  authorize,
  authorizeRequest,
  cancelAuthEid,
  cancelAuthEidRequest,
  confirmBasic,
  confirmBasicRequest,
  loginBasic,
  loginBasicRequest,
  loginUpgraded,
  loginUpgradedRequest,
  refresh,
  refreshRequest,
  registerBasic,
  registerBasicRequest,
  registerCorporate,
  registerCorporateRequest,
  registerUpgraded,
  registerUpgradedRequest,
  uploadCorporateFiles
} from './actions';

export const initialState: SessionState = {
  loggedIn: null,
  loginRequestId: null,
  registerRequestId: null,
  corporateRequestId: null,
  accountType: null,
  token: null,
  corporateMerkleRoot: null,

  accountCreatedTime: null,
  lastAuthorizeTime: null,

  loading: {
    registerBasic: false,
    confirmBasic: false,
    registerUpgraded: false,
    registerCorporate: false,
    uploadCorporateFiles: false,
    loginBasic: false,
    loginUpgraded: false,
    refresh: true,
    authorize: true,
    cancel: false,
    signature: false
  },

  error: {
    registerBasic: null,
    confirmBasic: null,
    registerUpgraded: null,
    registerCorporate: null,
    uploadCorporateFiles: null,
    loginBasic: null,
    loginUpgraded: null,
    refresh: null,
    authorize: null,
    cancel: null,
    signature: null
  }
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    registerBasicFulfilled: (state) => {
      state.loading.registerBasic = false;
    },

    registerBasicRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.registerBasic = false;
      state.error.registerBasic = payload;
    },

    confirmBasicFulfilled: (state) => {
      state.loading.confirmBasic = false;
    },

    confirmBasicRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.confirmBasic = false;
      state.error.confirmBasic = payload;
    },

    loginBasicFulfilled: (state, { payload }: PayloadAction<LoginRes>) => {
      state.loading.loginBasic = false;
      state.token = serializeToken(payload);
    },

    loginBasicRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.loginBasic = false;
      state.error.loginBasic = payload;
    },

    registerUpgradedFulfilled: (state, { payload }: PayloadAction<LoginRes>) => {
      state.loading.registerUpgraded = false;
      state.loading.signature = false;
      state.token = serializeToken(payload);
      state.accountCreatedTime = serializeAccountCreatedTimestamp(payload.accountCreated);
      state.registerRequestId = null;
    },

    registerUpgradedRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.registerUpgraded = false;
      state.registerRequestId = null;
      state.error.registerUpgraded = payload;
      state.loading.signature = false;
    },

    registerCorporateFulfilled: (state, { payload }: PayloadAction<LoginRes>) => {
      state.loading.registerCorporate = false;
      state.loading.signature = false;
      state.token = serializeToken(payload);
      state.accountCreatedTime = serializeAccountCreatedTimestamp(payload.accountCreated);
      state.corporateRequestId = null;
      state.corporateMerkleRoot = null;
    },

    registerCorporateRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.registerCorporate = false;
      state.loading.signature = false;
      state.error.registerCorporate = payload;
      state.corporateRequestId = null;
      state.corporateMerkleRoot = null;
    },

    loginUpgradedFulfilled: (state, { payload }: PayloadAction<LoginRes>) => {
      state.loading.loginUpgraded = false;
      state.loading.signature = false;
      state.token = serializeToken(payload);
      state.accountCreatedTime = serializeAccountCreatedTimestamp(payload.accountCreated);
      state.loginRequestId = null;
    },

    loginUpgradedRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.loginUpgraded = false;
      state.loading.signature = false;
      state.loginRequestId = null;
      state.error.loginUpgraded = payload;
    },

    cancelAuthEidFulfilled: (state) => {
      state.loading.cancel = false;
    },

    cancelAuthEidRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.cancel = false;
      state.error.cancel = payload;
    },

    refreshFulfilled: (state, { payload }: PayloadAction<RefreshRes>) => {
      state.loading.refresh = false;
      state.token = serializeToken(payload);
      state.accountCreatedTime = serializeAccountCreatedTimestamp(payload.accountCreated);
    },

    refreshRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.refresh = false;
      state.loading.authorize = false;
      state.token = null;
      state.error.refresh = payload;
    },

    authorizeFulfilled: (state, { payload }: PayloadAction<AuthorizeRes>) => {
      state.loading.authorize = false;
      state.loggedIn = true;
      state.accountType = payload.grant;
      state.lastAuthorizeTime = Date.now();
    },

    authorizeRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.authorize = false;
      state.token = null;
      state.error.authorize = payload;
    },

    updateRegisterRequestId: (state, { payload }: PayloadAction<AuthEidIdRes>) => {
      state.registerRequestId = payload.requestId;
    },

    updateRegisterCorporateRequestId: (state, { payload }: PayloadAction<AuthEidIdRes>) => {
      state.corporateRequestId = payload.requestId;
    },

    updateLoginRequestId: (state, { payload }: PayloadAction<AuthEidIdRes>) => {
      state.loginRequestId = payload.requestId;
    },

    updateRegisterAuthEidStatus: (state, { payload }: PayloadAction<UpgradedStatusRes>) => {
      const error = serializeAuthEidError(payload.status);

      state.loading.signature = payload.status === AuthEidStatus.NOT_READY;
      state.loading.registerUpgraded = !error;
      state.error.registerUpgraded = error;
    },

    updateRegisterCorporateAuthEidStatus: (state, { payload }: PayloadAction<UpgradedStatusRes>) => {
      const error = serializeAuthEidError(payload.status);

      state.loading.signature = payload.status === AuthEidStatus.NOT_READY;
      state.loading.registerCorporate = !error;
      state.error.registerCorporate = error;
    },

    updateLoginAuthEidStatus: (state, { payload }: PayloadAction<UpgradedStatusRes>) => {
      const error = serializeAuthEidError(payload.status);

      state.loading.signature = payload.status === AuthEidStatus.NOT_READY;
      state.loading.loginUpgraded = !error;
      state.error.loginUpgraded = error;
    },

    logout: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(registerBasicRequest.type, (state) => {
      state.loading.loginBasic = true;
      state.error.loginBasic = null;
    });

    builder.addCase(confirmBasicRequest.type, (state) => {
      state.loading.confirmBasic = true;
      state.error.confirmBasic = null;
    });

    builder.addCase(loginBasicRequest.type, (state) => {
      state.loading.loginBasic = true;
      state.error.loginBasic = null;
    });

    builder.addCase(registerUpgradedRequest.type, (state) => {
      state.loading.registerUpgraded = true;
      state.error.registerUpgraded = null;
    });

    builder.addCase(registerCorporateRequest.type, (state, { payload }: PayloadAction<RegisterCorporateSocketReq>) => {
      state.loading.registerCorporate = true;
      state.error.registerCorporate = null;
      state.corporateMerkleRoot = payload.args.validationData.merkleRoot;
    });

    builder.addCase(uploadCorporateFiles.pending, (state) => {
      state.loading.uploadCorporateFiles = true;
      state.error.uploadCorporateFiles = null;
    });

    builder.addCase(uploadCorporateFiles.fulfilled, (state) => {
      state.loading.uploadCorporateFiles = false;
    });

    builder.addCase(uploadCorporateFiles.rejected, (state) => {
      state.loading.uploadCorporateFiles = false;
      state.error.uploadCorporateFiles = 'Something went wrong';
    });

    builder.addCase(loginUpgradedRequest.type, (state) => {
      state.loading.loginUpgraded = true;
      state.error.loginUpgraded = null;
    });

    builder.addCase(cancelAuthEidRequest.type, (state) => {
      state.loading.cancel = true;
      state.error.cancel = null;
      state.registerRequestId = null;
      state.loginRequestId = null;
    });

    builder.addCase(refreshRequest.type, (state) => {
      state.loading.refresh = true;
      state.error.refresh = null;
    });

    builder.addCase(authorizeRequest.type, (state) => {
      state.error.authorize = null;
    });
  }
});

export const sessionReducer = sessionSlice.reducer;
export const sessionActions = {
  ...sessionSlice.actions,
  registerBasic,
  confirmBasic,
  loginBasic,
  registerUpgraded,
  registerCorporate,
  uploadCorporateFiles,
  loginUpgraded,
  cancelAuthEid,
  refresh,
  authorize
};
