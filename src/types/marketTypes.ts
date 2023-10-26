import { ProductSide, ProductType } from '~/types/productTypes';

export enum DealerOfferCommand {
  REMOVE,
  UPDATE
}

export type DealerOffer<T> = {
  id: string;
  side: ProductSide;
  price: T;
  volume: T;
  command: DealerOfferCommand;

  // WARNING: these values don't come from the API
  // (i.e. calculated on client side)
  clientDiff: number;
  clientDiffPercentage: number;
};

export type PairPrice<T> = {
  bid: T;
  ask: T;
};

export type MarketPrice<T> = PairPrice<T> & {
  liveCutOffPrice: T;
};

export type MarketPrices = {
  [K in ProductType]?: MarketPrice<number>;
};
