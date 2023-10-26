import { AUTH_EID_REQUEST_URL } from '~/constants/configConstants';
import { AuthEidStatus } from '~/types/authEidTypes';

import { LoginRes, RefreshRes, SessionState } from './types';

export const serializeToken = (payload: RefreshRes | LoginRes): SessionState['token'] => {
  const expiresIn = (payload.expiresIn - 60) * 1000;

  return {
    value: payload.accessToken,
    expiresIn,
    expirationDate: Date.now() + expiresIn
  };
};

export const serializeAccountCreatedTimestamp = (dateString: string) => new Date(dateString).getTime();

export const serializeAuthEidRequestUrl = (requestId: string) => `${AUTH_EID_REQUEST_URL}${requestId}`;

export const serializeAuthEidError = (status: AuthEidStatus) => {
  if (status === AuthEidStatus.CANCELLED) return 'Auth eID signature cancelled';
  if (status === AuthEidStatus.ACCOUNT_NOT_VERIFIED) return 'Auth eID account not verified';

  return null;
};
