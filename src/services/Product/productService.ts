import { Currency, Ticker } from '~/types/currencyTypes';
import { CURRENCY_NAMES, CURRENCY_SYMBOLS, TICKER_NAMES } from '~/constants/currencyConstants';

export const toProductPair = (ticker: Ticker, currency: Currency) => {
  return `${ticker}/${currency}`;
};

export const toFullProductPair = (ticker: Ticker, currency: Currency) => {
  return `${TICKER_NAMES[ticker]}/${[CURRENCY_NAMES[currency]]}`;
};

export const getCurrencySymbol = (ccy: Currency) => {
  return CURRENCY_SYMBOLS[ccy];
};
