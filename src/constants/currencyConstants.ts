import { ProductType } from '~/types/productTypes';
import { Currency, Ticker } from '~/types/currencyTypes';

export const CURRENCY_SYMBOLS = {
  [Currency.USDT]: '$',
  [Currency.USD]: '$',

  [Currency.EURX]: '€',
  [Currency.EUR]: '€'
};

export const MARGIN_CURRENCIES = {
  [ProductType.BTC_USDT]: `${Currency.USD}P`,
  [ProductType.ETH_USDT]: `${Currency.USD}P`

  // [ProductType.BTC_EURX]: `${Currency.EUR}P`,
};

export const BALANCE_CURRENCIES = {
  [ProductType.BTC_USDT]: Currency.USDT,
  [ProductType.ETH_USDT]: Currency.USDT

  // [ProductType.BTC_EURX]: Currency.EUR,
};

export const PRICE_CURRENCIES = {
  [ProductType.BTC_USDT]: Currency.USDT,
  [ProductType.ETH_USDT]: Currency.USDT

  // [ProductType.BTC_EURX]: Currency.EURX,
};

export const CURRENCY_NAMES = {
  [Currency.USDT]: 'Tether USD',
  [Currency.USD]: 'USD',

  [Currency.EURX]: 'EURx',
  [Currency.EUR]: 'EUR'
};

export const TICKER_NAMES = {
  [Ticker.BTC]: 'Bitcoin',
  [Ticker.ETH]: 'Ethereum'
};
