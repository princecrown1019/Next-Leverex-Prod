import { TimeRangeBalances } from '~/types/balancesHistoryTypes';

export const serializeTimeRangeBalances = (balances: TimeRangeBalances<string>): TimeRangeBalances<number> => ({
  openingBalance: Number(balances.openingBalance),
  closingBalance: Number(balances.closingBalance)
});
