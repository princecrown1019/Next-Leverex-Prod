export enum BalancesHistoryReference {
  BALANCES = 'balances'
}

export type TimeRangeBalances<T> = {
  openingBalance: T;
  closingBalance: T;
};
