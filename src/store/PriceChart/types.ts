import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { ProductType } from '~/types/productTypes';
import { ChartCandle, ChartInterval, ChartReference } from '~/types/chartTypes';

/*
 * Requests
 */

export type LoadTradesReq = {
  interval: ChartInterval;
  timestampEnd?: null | number;
  reference?: ChartReference;
};

type LoadTradesExtendedReq = LoadTradesReq & {
  productType: ProductType;
  count: number;
};

/*
 * API Requests
 */

export type LoadTradesSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_OHLC, LoadTradesExtendedReq>;

export type PriceChartSocketMainReqs = LoadTradesSocketReq;

/*
 * API Responses
 */

export type LoadTradesRes = {
  productType: ProductType;
  interval: ChartInterval;
  count: number;
  timestampStartDb: number;
  candles: ChartCandle<string>[];
};

/*
 * State
 */

type StateKeys = 'candles' | 'lastTwo';

export type PriceChartState = {
  candles: ChartCandle<number>[];
  productType: ProductType;
  interval: ChartInterval;
  timestampEnd: null | number;
  hasNext: boolean;

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
};
