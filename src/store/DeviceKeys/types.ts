import { SocketAuthEndpoint, SocketAuthReq } from '~/types/socketTypes';
import { DeviceKey } from '~/types/deviceKeysTypes';

/*
 * Requests
 */

export type LoadDeviceKeysExtendedReq = {
  accessToken: string;
};

export type RevokeDeviceKeyReq = {
  kid: string;
};

export type RevokeDeviceKeyExtendedReq = RevokeDeviceKeyReq & {
  accessToken: string;
};

/*
 * API Requests
 */

export type LoadDeviceKeysSocketReq = SocketAuthReq<SocketAuthEndpoint.LOAD_DEVICE_KEYS, LoadDeviceKeysExtendedReq>;
export type RevokeDeviceKeySocketReq = SocketAuthReq<SocketAuthEndpoint.REVOKE_DEVICE_KEY, RevokeDeviceKeyExtendedReq>;

export type DeviceKeysSocketAuthReqs = LoadDeviceKeysSocketReq | RevokeDeviceKeySocketReq;

/*
 * API Responses
 */

export type DeviceKeysRes = DeviceKey<string>[];

/*
 * State
 */

type StateKeys = 'deviceKeys' | 'revoke';

export type DeviceKeysState = {
  deviceKeys: DeviceKey<number>[];

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
};
