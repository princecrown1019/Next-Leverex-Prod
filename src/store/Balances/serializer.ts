import { Balance } from '~/types/balanceTypes';
import { fixDecimals } from '~/services/NumberFormat/numberFormatService';

import { BalancesRes } from './types';

const serializeBalance = (balance: Balance<string>): Balance<number> => ({
  ...balance,
  balance: Number(fixDecimals(balance.balance, 2))
});

export const serializeBalances = (stateBalances: Balance<number>[], { balances }: BalancesRes) => {
  if (stateBalances.length === 0) return balances.map((balance) => serializeBalance(balance));

  return stateBalances.map((balance) => {
    const updatedBalance = balances.find((item) => item.currency === balance.currency);

    return updatedBalance ? serializeBalance(updatedBalance) : balance;
  });
};
