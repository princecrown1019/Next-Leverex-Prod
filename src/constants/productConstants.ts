// import { DEV_ENV } from '~/constants/configConstants';
import { Product, ProductSide, ProductType } from '~/types/productTypes';
import { Currency, Ticker } from '~/types/currencyTypes';
import { BtcIcon, EthIcon, USDtIcon } from '~/assets/Icons';

export const PRODUCT_NAMES = {
  [ProductType.BTC_USDT]: `${Ticker.BTC}/${Currency.USDT}`,
  [ProductType.ETH_USDT]: `${Ticker.ETH}/${Currency.USDT}`

  // [ProductType.BTC_EURX]: `${Currency.BTC}/${Currency.EURX}`,
};

export const PRODUCT_TYPES = {
  [`${Ticker.BTC}/${Currency.USDT}`]: ProductType.BTC_USDT,
  [`${Ticker.ETH}/${Currency.USDT}`]: ProductType.ETH_USDT

  // [`${Currency.BTC}/${Currency.EURX}`]: ProductType.BTC_EURX,
};

export const PRODUCT_FULL_NAMES = {
  [ProductType.BTC_USDT]: 'Tether USD'

  // [ProductType.BTC_EURX]: Currency.EURX,
};

export const PRODUCT_SIDES_NAME = {
  [ProductSide.BUY]: 'LONG',
  [ProductSide.SELL]: 'SHORT'
};

export const PRODUCT_ICONS = {
  // [ProductType.BTC_EURX]: EURxIcon,
  [ProductType.BTC_USDT]: USDtIcon,
  [ProductType.ETH_USDT]: EthIcon
};

export const PRODUCT_TICKERS = {
  [ProductType.BTC_USDT]: Ticker.BTC,
  [ProductType.ETH_USDT]: Ticker.ETH
};

export const PRODUCT_CURRENCIES = {
  [ProductType.BTC_USDT]: Currency.USDT,
  [ProductType.ETH_USDT]: Currency.USDT

  // [ProductType.BTC_EURX]: Currency.EURX,
};

export const products: Product[] = [
  {
    type: ProductType.BTC_USDT,
    ticker: Ticker.BTC,
    currency: Currency.USDT,
    Icon: BtcIcon
  },
  {
    type: ProductType.ETH_USDT,
    ticker: Ticker.ETH,
    currency: Currency.USDT,
    Icon: EthIcon,
    disabled: true
  }
];

export const supportedProducts = products.filter((product) => !product.disabled);
