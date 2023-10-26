import { SocketAuthEndpoint, SocketAuthReq, SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { AccountType, SessionToken } from '~/types/sessionTypes';
import { AuthEidStatus } from '~/types/authEidTypes';

/*
 * Request
 */

export type AuthEidReq = {
  requestId: null | string;
};

export type CancelAuthEidReq = {
  requestId: string;
};

export type RegisterBasicReq = {
  phone: string;
};

export type RegisterBasicExtendedReq = {
  phone: string;
  publicKey: JsonWebKey;
};

export type RegisterCorporateReq = {
  merkleRoot: string;
  companyName: string;
};

export type UploadCorporateFilesReq = {
  form: File;
  certificate: File;
  additionalFile?: null | File;
};

type RegisterCorporateExtendedReq = LoginUpgradedReq & {
  validationData: {
    merkleRoot: string;
  };
};

export type ConfirmBasicReq = {
  code: string;
};

export type ConfirmBasicExtendedReq = {
  signedCode: string;
};

export type RefreshReq = {
  accessToken: string;
};

export type AuthorizeReq = {
  token: string;
};

type LoginUpgradedReq = {
  serviceUrl: string;
};

type LoginBasicReq = {
  signedChallenge: string;
};

type RefreshSessionReq = {
  accessToken: string;
};

/*
 * API Requests
 */

export type RegisterBasicSocketReq = SocketAuthReq<SocketAuthEndpoint.REGISTER_BASIC, RegisterBasicExtendedReq>;
export type ConfirmBasicSocketReq = SocketAuthReq<SocketAuthEndpoint.CONFIRM_BASIC, ConfirmBasicExtendedReq>;
export type LoginBasicSocketReq = SocketAuthReq<SocketAuthEndpoint.LOG_IN_BASIC, LoginBasicReq>;
export type LoginUpgradedSocketReq = SocketAuthReq<SocketAuthEndpoint.LOGIN, LoginUpgradedReq>;
export type CancelAuthEidSocketReq = SocketAuthReq<SocketAuthEndpoint.CANCEL_REQUEST, CancelAuthEidReq>;
export type RegisterUpgradedSocketReq = SocketAuthReq<SocketAuthEndpoint.REGISTER, LoginUpgradedReq>;
export type RefreshSocketReq = SocketAuthReq<SocketAuthEndpoint.REFRESH_SESSION, RefreshSessionReq>;
export type RegisterCorporateSocketReq = SocketAuthReq<
  SocketAuthEndpoint.CORPORATE_REGISTER,
  RegisterCorporateExtendedReq
>;

export type AuthorizeSocketReq = SocketMainReq<SocketMainEndpoint.AUTHORIZE, AuthorizeReq>;

export type SessionSocketAuthReqs =
  | RegisterBasicSocketReq
  | ConfirmBasicSocketReq
  | LoginBasicSocketReq
  | LoginUpgradedSocketReq
  | CancelAuthEidSocketReq
  | RegisterUpgradedSocketReq
  | RefreshSocketReq
  | RegisterCorporateSocketReq;

export type SessionSocketMainReqs = AuthorizeSocketReq;

/*
 * API Responses
 */

export type AuthEidIdRes = {
  requestId: string;
};

export type AuthEidIdStatusRes = {
  status: AuthEidStatus;
};

export type RegisterBasicRes = {
  smsVerify: string;
  expiresIn: number; // Seconds
};

export type LoginRes = {
  accessToken: string;
  expiresIn: number; // Seconds
  grant: AccountType;
  accountCreated: string;
};

export type UpgradedStatusRes = AuthEidIdStatusRes & LoginRes;

export type RefreshRes = LoginRes & {
  valid: boolean;
};

export type AuthorizeRes = {
  validity: number;
  grant: AccountType;
};

export type AuthEidStatusRes = {
  status: AuthEidStatus;
};

/*
 * State
 */

type StateKeys =
  | 'refresh'
  | 'registerBasic'
  | 'confirmBasic'
  | 'registerUpgraded'
  | 'registerCorporate'
  | 'uploadCorporateFiles'
  | 'loginBasic'
  | 'loginUpgraded'
  | 'authorize'
  | 'signature'
  | 'cancel';

export type SessionState = {
  loggedIn: null | boolean;
  accountType: null | AccountType;

  loginRequestId: null | string;
  registerRequestId: null | string;
  corporateRequestId: null | string;

  corporateMerkleRoot: null | string;

  token: null | SessionToken;

  accountCreatedTime: null | number;
  lastAuthorizeTime: null | number;

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
};
