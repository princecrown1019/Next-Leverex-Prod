import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '~/store/types';

export const selectBalanceHistoryOpeningValue = (state: AppState) => state.balancesHistory.openingBalance;
export const selectBalanceHistoryClosingValue = (state: AppState) => state.balancesHistory.closingBalance;
export const selectBalanceHistoryLoading = (state: AppState) => state.balancesHistory.loading.balances;

export const selectBalancesRangeHistory = createSelector(
  [selectBalanceHistoryOpeningValue, selectBalanceHistoryClosingValue],
  (openingBalance, closingBalance) => ({
    openingBalance,
    closingBalance
  })
);
