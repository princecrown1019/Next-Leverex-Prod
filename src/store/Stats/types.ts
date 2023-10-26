import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { ProductType } from '~/types/productTypes';

/*
 * Requests
 */

export type LoadReq = {
  productType: ProductType;
};

/*
 * API Requests
 */

/*
 * API Request
 */

export type LoadVersionDataSocketReq = SocketMainReq<SocketMainEndpoint.CONNECTED, object>;
export type LoadSessionOpenSocketReq = SocketMainReq<SocketMainEndpoint.SESSION_OPEN, LoadReq>;
export type LoadTradingStatsSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_TRADING_STATS, LoadReq>;

export type StatsSocketMainReqs = LoadSessionOpenSocketReq | LoadTradingStatsSocketReq;

/*
 * API Responses
 */

export type LoadVersionRes = {
  version: string;
};

export type LoadDayRes = {
  timeToCutOff: number;
  cutOffAt: number;
  lastCutOffPrice: string;
  productType: ProductType;
  errorMsg?: string;
};

export type LoadStatsRes = {
  cutoff: string;
  dailyVolume: string;
  openInterest: string;
  productType: ProductType;
  errorMsg?: string;
};

export type TradingClosedRes = {
  productType: ProductType;
};

/*
 * State
 */

type StateKeys = 'tradingStats' | 'sessionData';

export type StatsState = {
  lastCutOffPrice: { [P in ProductType]?: number };
  timeToCutOff: { [P in ProductType]?: number };
  nextCutOffAt: { [P in ProductType]?: number };
  dailyVolume: { [P in ProductType]?: number };
  openInterest: { [P in ProductType]?: number };

  closed: { [P in ProductType]: boolean };

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
  version: string;
};
