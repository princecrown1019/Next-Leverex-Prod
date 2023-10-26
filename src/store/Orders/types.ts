import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { ProductSide, ProductType } from '~/types/productTypes';
import { Order, OrderAction } from '~/types/orderTypes';

/*
 * Requests
 */

export type LoadSessionOrdersReq = {
  productType?: ProductType;
};

export type LoadOrdersReq = {
  limit?: number;
  offset?: number;
};

export type LoadOrdersExtendedReq = Required<LoadOrdersReq> & {
  startTime?: number;
};

export type CreateOrderReq<T> = {
  side: ProductSide;
  productType: ProductType;
  userExpectedPrice?: T;
  reference?: string;
  amount: T;
};

export type CreateWorkingOrderReq = {
  side: ProductSide;
  productType: ProductType;
  price: number;
  quantity: number;
};

export type CancelWorkingOrderReq = {
  side?: ProductSide;
  productType?: ProductType;
  price?: number;
  id?: string;
};

/*
 * API Requests
 */

export type LoadSessionOrdersSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_ORDERS, LoadSessionOrdersReq>;
export type LoadOrdersSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_TRADE_HISTORY, LoadOrdersExtendedReq>;
export type CreateOrderSocketReq = SocketMainReq<SocketMainEndpoint.CREATE_MARKET_ORDER, CreateOrderReq<string>>;

export type OrdersSocketMainReqs = LoadSessionOrdersSocketReq | LoadOrdersSocketReq | CreateOrderSocketReq;

/*
 * API Responses
 */

export type CreateOrderRes = {
  reference?: string;
};

export type LoadOrdersRes = {
  orders: Order<string>[];
};

export type UpdateOrderRes = {
  order: Order<string>;
  action: OrderAction;
  reference?: string;
};

/*
 * State
 */

type StateKeys = 'sessionOrders' | 'orders' | 'create';

export type OrdersState = {
  sessionOrders: Order<number>[];
  workingOrders: Order<number>[];
  orders: Order<number>[];
  offset: number;
  hasNext: boolean;

  loadingWorkingIds: string[];

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
};
