import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { SocketAuthEndpoint, SocketAuthReq, SocketCloseStatus } from '~/types/socketTypes';
import { SessionSocketAuthReqs } from '~/store/Session/types';
import { DeviceKeysSocketAuthReqs } from '~/store/DeviceKeys/types';

/*
 * Requests
 */

export type DisconnectReq = {
  code: SocketCloseStatus;
};

/*
 * API Requests
 */

export type SendReq = SessionSocketAuthReqs | DeviceKeysSocketAuthReqs;

/*
 * API Responses
 */

export type DisconnectedRes = {
  code: number;
  forceDisconnection: boolean;
  reason: string;
};

/*
 * Handlers
 */

type FulfilledHandler = ActionCreatorWithPayload<any>;
type RejectedHandler = ActionCreatorWithPayload<string>;
export type Handlers = { [K in SocketAuthEndpoint]: [null | FulfilledHandler, null | RejectedHandler] };

/*
 * State
 */

export type SocketAuthState = {
  connected: boolean;
  callbackPayload: null | SocketAuthReq;

  loading: boolean;

  error: null | string;
};
