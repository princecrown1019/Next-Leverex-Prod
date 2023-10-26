import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { Address } from '~/types/addressTypes';

/*
 * Requests
 */

export type WhitelistReq = {
  address: string;
  description?: string;
};

export type RemoveReq = {
  address: string;
};

/*
 * API Requests
 */

export type LoadAddressesSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_ADDRESSES>;
export type WhitelistAddressSocketReq = SocketMainReq<SocketMainEndpoint.CREATE_ADDRESS, WhitelistReq>;
export type RemoveAddressSocketReq = SocketMainReq<SocketMainEndpoint.REMOVE_ADDRESS, RemoveReq>;

export type AddressesSocketMainReqs = LoadAddressesSocketReq | WhitelistAddressSocketReq | RemoveAddressSocketReq;

/*
 * API Responses
 */

type AddressRes = Omit<Address, 'timestamp'> & {
  addedTimestamp: number;
};

export type LoadAddressesRes = {
  addresses: AddressRes[];
};

export type WhitelistRes = AddressRes;

export type RemoveRes = {
  address: string;
};

/*
 * State
 */

type StateKeys = 'addresses' | 'whitelist' | 'remove';

export type AddressesState = {
  addresses: Address[];

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
};
