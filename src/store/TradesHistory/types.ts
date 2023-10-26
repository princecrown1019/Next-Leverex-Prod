import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { TradeDay, TradeSession, TradesHistoryReference } from '~/types/tradesHistoryTypes';
import { ProductType } from '~/types/productTypes';
import { Order } from '~/types/orderTypes';

/*
 * Requests
 */

export type LoadDaysReq = {
  limit?: number;
  offset?: number;
  productType?: ProductType;
};

export type LoadSessionsReq = {
  startTime: number;
  endTime: number;
  productType?: ProductType;
};

export type LoadTradesReq = {
  limit?: number;
  date: string;
  offset: number;
  startTime: number;
  endTime: number;
  productType?: ProductType;
};

export type LoadCsvTradesReq = {
  limit?: number;
  offset: number;
  startTime?: null | number;
  endTime?: null | number;
  reference?: TradesHistoryReference;
  productType?: ProductType;
};

export type ResetDayReq = {
  startTime: number;
  endTime: number;
};

/*
 * API Requests
 */

export type LoadDaysSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_TRADE_DAYS_HISTORY, Required<LoadDaysReq>>;
export type LoadSessionsSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_TRADE_SESSION_HISTORY, LoadSessionsReq>;
export type LoadTradesSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_TRADE_HISTORY, Omit<LoadTradesReq, 'date'>>;
export type LoadCsvTradesSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_TRADE_HISTORY, Required<LoadCsvTradesReq>>;

export type TradesHistoryMainReqs =
  | LoadDaysSocketReq
  | LoadTradesSocketReq
  | LoadSessionsSocketReq
  | LoadCsvTradesSocketReq;

/*
 * API Responses
 */

export type LoadOrdersRes = {
  orders: Order<string>[];
};

export type LoadSessionsRes = {
  sessions: TradeSession<string>[];
  openingBalance: string;
  closingBalance: string;
  reference?: TradesHistoryReference;
};

export type LoadDaysRes = {
  days: TradeSession<string>[];
};

/*
 * State
 */

type StateKeys = 'orders' | 'sessions' | 'days';

export type TradesHistoryState = {
  orders: Order<number>[];
  days: TradeDay<number>[];
  sessions: TradeSession<number>[];
  openSession: null | TradeSession<number>;

  [TradesHistoryReference.DOWNLOAD]: Order<number>[];

  startTime: { [K in StateKeys | TradesHistoryReference]: null | number };
  endTime: { [K in StateKeys | TradesHistoryReference]: null | number };

  offset: { [K in StateKeys | TradesHistoryReference]: number };
  hasNext: { [K in StateKeys | TradesHistoryReference]: boolean };

  loading: { [K in StateKeys | TradesHistoryReference]: boolean };
  error: { [K in StateKeys | TradesHistoryReference]: null | string };
};
