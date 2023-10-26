import { ProductType } from '~/types/productTypes';

export enum ChartInterval {
  ONE_MINUTE,
  FIVE_MINUTES,
  FIFTEEN_MINUTES,
  THIRTY_MINUTES,
  ONE_HOUR,
  ONE_DAY
}

export type ChartCandle<T> = {
  timestamp: number;
  time: number;
  productType: ProductType;
  open: T;
  high: T;
  low: T;
  close: T;
  trades: T;
  volume: T;
};

export enum ChartReference {
  ALL = 'all',
  LAST_TWO = 'lastTwo'
}
