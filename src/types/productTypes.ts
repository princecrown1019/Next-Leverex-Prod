import { FC } from 'react';

import { Currency, Ticker } from '~/types/currencyTypes';

export enum ProductType {
  BTC_USDT = 'xbtusd_rf',
  ETH_USDT = 'ethusd_rf'

  // BTC_EURX = 'xbteur_rf',
}

export enum ProductSide {
  BUY = 1,
  SELL
}

export enum NetExposure {
  LONG = 'LONG',
  SHORT = 'SHORT',
  FLAT = 'FLAT'
}

export type Product = {
  ticker: Ticker;
  currency: Currency;
  type: ProductType;
  Icon: FC<{ className?: string }>;
  disabled?: boolean;
};
