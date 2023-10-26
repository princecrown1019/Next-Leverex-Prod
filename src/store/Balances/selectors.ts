import { createSelector } from '@reduxjs/toolkit';

import { MARGIN_CURRENCIES, BALANCE_CURRENCIES } from '~/constants/currencyConstants';
import { AppState } from '~/store/types';
import { selectProductType } from '~/store/Market/selectors';

export const selectBalances = (state: AppState) => state.balances.balances;
export const selectBalancesLoading = (state: AppState) => state.balances.loading;

export const selectMargin = createSelector([selectBalances, selectProductType], (balances, productType) => {
  return balances.find((item) => item.currency === MARGIN_CURRENCIES[productType])?.balance || 0;
});

export const selectBuyingPower = createSelector([selectBalances, selectProductType], (balances, productType) => {
  return balances.find((item) => item.currency === BALANCE_CURRENCIES[productType])?.balance || 0;
});

export const selectTotalBalance = createSelector([selectBuyingPower, selectMargin], (buyingPower, margin) => {
  return buyingPower + margin;
});
