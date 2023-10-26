import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { Deposit, DepositsReference } from '~/types/depositsTypes';

/*
 * Requests
 */

export type LoadDepositsDownloadReq = {
  startTime: number;
  endTime: number;
  reference?: number;
};

/*
 * API Request
 */

export type LoadDepositsSocketReq = SocketMainReq<
  SocketMainEndpoint.LOAD_DEPOSITS,
  LoadDepositsDownloadReq | Record<string, unknown>
>;
export type LoadDepositAddressSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_DEPOSIT_ADDRESS>;

export type DepositsSocketMainReqs = LoadDepositsSocketReq | LoadDepositAddressSocketReq;

/*
 * Api Responses
 */

export type UpdateDepositRes = Deposit<string>;

export type LoadDepositsRes = {
  deposits: Deposit<string>[];
};

export type LoadDepositAddressRes = {
  address: string;
};

/*
 * State
 */

type StateKeys = 'deposits' | 'depositAddress' | DepositsReference;

export type DepositsState = {
  deposits: Deposit<number>[];
  depositAddress: null | string;

  [DepositsReference.DOWNLOAD]: Deposit<number>[];

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
};
