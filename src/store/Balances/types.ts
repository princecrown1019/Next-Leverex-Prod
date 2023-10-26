import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { Balance } from '~/types/balanceTypes';

/*
 * API Requests
 */

export type BalancesSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_BALANCE>;

export type BalancesSocketMainReqs = BalancesSocketReq;

/*
 * API Responses
 */

export type BalancesRes = {
  balances: Balance<string>[];
};

/*
 * State
 */

export type BalancesState = {
  balances: Balance<number>[];

  loading: boolean;

  error: null | string;
};
