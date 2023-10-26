import { Currency, Ticker } from '~/types/currencyTypes';
import { CURRENCY_NAMES, CURRENCY_SYMBOLS, TICKER_NAMES } from '~/constants/currencyConstants';

import * as productService from './productService';

describe('productService', () => {
  describe('toProductPair', () => {
    it('should return "BTC/USDT" pair', () => {
      expect(productService.toProductPair(Ticker.BTC, Currency.USDT)).toBe(`${Ticker.BTC}/${Currency.USDT}`);
    });

    it('should return "BTC/EURx" pair', () => {
      expect(productService.toProductPair(Ticker.BTC, Currency.EURX)).toBe(`${Ticker.BTC}/${Currency.EURX}`);
    });

    it('should return "ETH/USDT" pair', () => {
      expect(productService.toProductPair(Ticker.ETH, Currency.USDT)).toBe(`${Ticker.ETH}/${Currency.USDT}`);
    });

    it('should return "ETH/EURx" pair', () => {
      expect(productService.toProductPair(Ticker.ETH, Currency.EURX)).toBe(`${Ticker.ETH}/${Currency.EURX}`);
    });
  });

  describe('toFullProductPair', () => {
    it('should return "Bitcoin/Tether USD" full pair', () => {
      expect(productService.toFullProductPair(Ticker.BTC, Currency.USDT)).toBe(
        `${TICKER_NAMES[Ticker.BTC]}/${[CURRENCY_NAMES[Currency.USDT]]}`
      );
    });

    it('should return "Bitcoin/EURx" full pair', () => {
      expect(productService.toFullProductPair(Ticker.BTC, Currency.EURX)).toBe(
        `${TICKER_NAMES[Ticker.BTC]}/${[CURRENCY_NAMES[Currency.EURX]]}`
      );
    });

    it('should return "Ethereum/Tether USD" full pair', () => {
      expect(productService.toFullProductPair(Ticker.ETH, Currency.USDT)).toBe(
        `${TICKER_NAMES[Ticker.ETH]}/${[CURRENCY_NAMES[Currency.USDT]]}`
      );
    });

    it('should return "Ethereum/EURx" full pair', () => {
      expect(productService.toFullProductPair(Ticker.ETH, Currency.EURX)).toBe(
        `${TICKER_NAMES[Ticker.ETH]}/${[CURRENCY_NAMES[Currency.EURX]]}`
      );
    });
  });

  describe('getCurrencySymbol', () => {
    it('should return a valid currency symbol for USDT', () => {
      expect(productService.getCurrencySymbol(Currency.USDT)).toBe(CURRENCY_SYMBOLS[Currency.USDT]);
    });

    it('should return a valid currency symbol for USD', () => {
      expect(productService.getCurrencySymbol(Currency.USD)).toBe(CURRENCY_SYMBOLS[Currency.USD]);
    });

    it('should return a valid currency symbol for EURx', () => {
      expect(productService.getCurrencySymbol(Currency.EURX)).toBe(CURRENCY_SYMBOLS[Currency.EURX]);
    });

    it('should return a valid currency symbol for EUR', () => {
      expect(productService.getCurrencySymbol(Currency.EUR)).toBe(CURRENCY_SYMBOLS[Currency.EUR]);
    });
  });
});
