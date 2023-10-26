import { ProductSide, ProductType } from '~/types/productTypes';

export enum OrderAction {
  CREATED = 1,
  UPDATED,
  REMOVED
}

export enum OrderStatus {
  PENDING = 1,
  FILLED,
  VOID,
  WORKING
}

export enum RolloverType {
  NOT_ROLLOVER,
  ROLLOVER,
  LIQUIDATION,
  DEFAULT
}

export type Order<T> = {
  id: string;
  status: OrderStatus;
  statusText: string;
  timestamp: number;
  rolloverType: RolloverType;
  productType: ProductType;
  productAgainst: string;
  side: ProductSide;
  quantity: T;
  fee: T;
  referenceExposure: T;
  price: T;
  tradeType: number;
  tradeIm: T;
  cutOffPrice: T;
  tradePnl: T;
  sessionId: string;

  // WARNING: these values don't come from the API
  // (i.e. calculated on client side)
  clientIsDefault: boolean;
  clientIsLiquidation: boolean;
};

export enum OrderExposureLabel {
  LONG = 'Long',
  SHORT = 'Short',
  FLAT = 'Flat'
}
