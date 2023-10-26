import { SocketAuthEndpoint, SocketMainEndpoint } from '~/types/socketTypes';

import * as socketFormatService from './socketFormatService';

describe('socketFormatService', () => {
  describe('buildAuthSocketReq', () => {
    it('should return a valid request body', () => {
      const req = socketFormatService.buildAuthSocketReq(SocketAuthEndpoint.REGISTER, 'test', {
        something: 'something to test 1'
      });

      expect(req.method).toBe(SocketAuthEndpoint.REGISTER);
      expect(req.api).toBe('test');
      expect(req.args.something).toBe('something to test 1');
      expect(req.messageId).toBeTruthy();
    });
  });

  describe('buildMainSocketReq', () => {
    it('should return a valid request body', () => {
      const req = socketFormatService.buildMainSocketReq(SocketMainEndpoint.AUTHORIZE, {
        something: 'something to test 2'
      });

      expect(Object.keys(req)[0]).toBe(SocketMainEndpoint.AUTHORIZE);
      expect(req[SocketMainEndpoint.AUTHORIZE].something).toBe('something to test 2');
    });
  });
});
