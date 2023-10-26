import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { ProductSide, ProductType } from '~/types/productTypes';
import { DealerOffer, MarketPrices } from '~/types/marketTypes';

/*
 * Requests
 */

export type CommonReq = {
  productType: ProductType;
};

export type LoadMaxAmountReq = {
  side: ProductSide;
  productType: ProductType;
};

/*
 * API Requests
 */

export type SubscribePricesSocketReq = SocketMainReq<SocketMainEndpoint.SUBSCRIBE_MARKET_DATA, CommonReq>;
export type UnsubscribePricesSocketReq = SocketMainReq<SocketMainEndpoint.UNSUBSCRIBE_MARKET_DATA, CommonReq>;
export type SubscribeDealersOffersSocketReq = SocketMainReq<SocketMainEndpoint.SUBSCRIBE_DEALER_OFFERS, CommonReq>;
export type UnsubscribeDealersOffersSocketReq = SocketMainReq<SocketMainEndpoint.UNSUBSCRIBE_DEALER_OFFERS, CommonReq>;
export type LoadSessionHealthSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_SESSION_HEALTH, CommonReq>;

export type MarketSocketMainReqs =
  | SubscribePricesSocketReq
  | UnsubscribePricesSocketReq
  | SubscribeDealersOffersSocketReq
  | UnsubscribeDealersOffersSocketReq
  | LoadSessionHealthSocketReq;

/*
 * API Responses
 */

export type SubscribePricesRes = {
  productType: ProductType;
};

export type UnsubscribePricesRes = {
  productType: ProductType;
};

export type UpdatePricesRes = {
  ask: string;
  bid: string;
  productType: ProductType;
  liveCutoff?: string;
};

export type SubscribeDealersOffersRes = {
  productType: ProductType;
};

export type UnsubscribeDealersOffersRes = {
  productType: ProductType;
};

export type UpdateDealersOffersRes = {
  productType: ProductType;
  timestamp: number;
  offers: DealerOffer<string>[];
};

export type LoadSessionHealthRes = {
  productType: ProductType;
  healthy: boolean;
};

/*
 * State
 */

type StateKeys =
  | 'subscribePrices'
  | 'unsubscribePrices'
  | 'subscribeDealersOffers'
  | 'unsubscribeDealersOffers'
  | 'sessionHealth';

export type MarketState = {
  productType: ProductType;
  closed: boolean;
  prices: MarketPrices;
  dealersOffers: DealerOffer<number>[];

  sessionHealths: { [K in ProductType]?: boolean };

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
};
