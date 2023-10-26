import { MiddlewareOptions } from 'redux-ws-middleware';
import camelCase from 'camelcase-keys';
import snakeCase from 'snakecase-keys';

import { WS_MAIN_URL } from '~/constants/configConstants';
import { SocketMainReq, SocketMainRes } from '~/types/socketTypes';

import { socketMainActions } from './slice';
import { handleMessage } from './handlers';

export const socketMainOptions: MiddlewareOptions<SocketMainReq, SocketMainRes> = {
  url: WS_MAIN_URL,
  autoConnect: false,
  actionTypes: [/RequestMain$/, socketMainActions.connect.type, socketMainActions.disconnect.type],
  completedActionTypes: [socketMainActions.connectFulfilled.type, socketMainActions.disconnectFulfilled.type],
  onMessage: handleMessage,

  shouldOpen: true,

  serialize: (req) => snakeCase(req, { deep: true }) as unknown as SocketMainReq,
  deserialize: (res) => camelCase(res, { deep: true }) as SocketMainRes
};
