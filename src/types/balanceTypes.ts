import { Currency } from '~/types/currencyTypes';

export type Balance<T> = {
  currency: Currency;
  balance: T;
};
