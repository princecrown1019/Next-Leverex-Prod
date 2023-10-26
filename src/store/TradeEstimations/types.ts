import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { ProductSide, ProductType } from '~/types/productTypes';

/*
 * Requests
 */

export type LoadEstimationReq<T> = {
  qty: T;
  side: ProductSide;
  productType: ProductType;
};

export type LoadProductFeeReq = {
  productType: ProductType;
};

export type LoadMaxAmountReq = {
  side: ProductSide;
  productType: ProductType;
};

/*
 * API Requests
 */

export type LoadImEstimationSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_ESTIMATION_IM, LoadEstimationReq<string>>;
export type LoadProductFeeSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_PRODUCT_FEE, LoadProductFeeReq>;
export type LoadMaxAmountSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_MAX_TRADE_AMOUNT, LoadMaxAmountReq>;

export type TradeEstimationsSocketMainReqs =
  | LoadImEstimationSocketReq
  | LoadProductFeeSocketReq
  | LoadMaxAmountSocketReq;

/*
 * API Responses
 */

export type LoadEstimationRes = {
  expectedImReservation: string;
  feeAmount: string;
  productType: ProductType;
};

export type LoadProductFeeRes = {
  fee: string;
  feeCcy: string;
  productType: ProductType;
  im: string;
};

export type LoadMaxAmountRes = {
  qty: string;
  fee: string;
  side: ProductSide;
  productType: ProductType;
  errorMsg?: null | string;
};

/*
 * State
 */

type StateKeys = 'maxTradeAmount' | 'productFee' | 'imEstimation';

export type TradeEstimationsState = {
  maxTradeAmount: {
    [K in ProductType]?: {
      lastUpdateAt?: number;
      [ProductSide.BUY]?: number;
      [ProductSide.SELL]?: number;
    };
  };
  productFee: null | {
    im: number;
    fee: number;
  };
  imEstimation: null | {
    expectedImReservation: number;
    feeAmount: number;
  };

  loading: { [K in StateKeys]: boolean };
  error: { [K in Exclude<StateKeys, 'maxTradeAmount'>]: null | string } & {
    maxTradeAmount: null | { [K in ProductSide]?: null | string };
  };
};
