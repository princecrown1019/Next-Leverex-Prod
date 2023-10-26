import { MiddlewareOptions } from 'redux-ws-middleware';
import camelCase from 'camelcase-keys';
import snakeCase from 'snakecase-keys';

import { WS_AUTH_URL } from '~/constants/configConstants';
import { SocketAuthReq, SocketAuthRes, SocketCloseStatus } from '~/types/socketTypes';

import { socketAuthActions } from './slice';
import { handleMessage } from './handlers';

export const socketAuthOptions: MiddlewareOptions<SocketAuthReq, SocketAuthRes> = {
  url: WS_AUTH_URL,
  autoConnect: true,
  actionTypes: [socketAuthActions.send.type, socketAuthActions.connect.type, socketAuthActions.disconnect.type],
  completedActionTypes: [socketAuthActions.connectFulfilled.type, socketAuthActions.disconnectFulfilled.type],
  onMessage: handleMessage,

  shouldReconnect: ({ code }) => code !== SocketCloseStatus.WITHOUT_RECONNECT,
  shouldOpen: true,

  serialize: (req) => snakeCase(req, { deep: true }) as unknown as SocketAuthReq,
  deserialize: (res) => camelCase(res, { deep: true }) as SocketAuthRes
};
