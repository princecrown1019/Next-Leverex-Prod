import { SocketAuthEndpoint, SocketMainEndpoint, SocketAuthReq, SocketMainReq } from '~/types/socketTypes';

export const buildAuthSocketReq = <M extends SocketAuthEndpoint, A>(
  method: M,
  api: string,
  args: A
): SocketAuthReq<M, A> => ({
  method,
  messageId: `${Date.now()}`,
  api,
  args
});

export const buildMainSocketReq = <M extends SocketMainEndpoint, D>(method: M, data: D): SocketMainReq<M, D> =>
  ({
    [method]: data
  } as SocketMainReq<M, D>);
