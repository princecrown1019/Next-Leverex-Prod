import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { ProductType } from '~/types/productTypes';
import { BalancesHistoryReference, TimeRangeBalances } from '~/types/balancesHistoryTypes';

/*
 * Requests
 */

export type LoadTimeRangeBalancesReq = {
  startTime: number;
  endTime?: number;
  productType?: ProductType;
  reference?: BalancesHistoryReference;
};

/*
 * API Requests
 */

export type LoadTimeRangeBalancesSocketReq = SocketMainReq<
  SocketMainEndpoint.LOAD_TRADE_SESSION_HISTORY,
  LoadTimeRangeBalancesReq
>;

export type BalancesHistoryMainReqs = LoadTimeRangeBalancesSocketReq;

/*
 * API Responses
 */

export type LoadTimeRangeBalancesRes = TimeRangeBalances<string> & {
  reference?: BalancesHistoryReference;
};

/*
 * State
 */

type StateKeys = 'balances';

export type BalancesHistoryState = {
  openingBalance: number;
  closingBalance: number;

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
};
