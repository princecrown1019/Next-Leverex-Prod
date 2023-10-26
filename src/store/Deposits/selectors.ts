import { createSelector } from '@reduxjs/toolkit';

import { DepositsReference } from '~/types/depositsTypes';
import { AppState } from '~/store/types';
import { selectProduct } from '~/store/Market/selectors';
import { selectTotalWithdrawalAmountValue } from '~/store/Withdrawals/selectors';

export const selectDeposits = (state: AppState) => state.deposits.deposits;
export const selectDepositsLoading = (state: AppState) => state.deposits.loading.deposits;
export const selectDepositAddress = (state: AppState) => state.deposits.depositAddress;
export const selectDepositAddressLoading = (state: AppState) => state.deposits.loading.depositAddress;
export const selectDepositsForDownload = (state: AppState) => state.deposits[DepositsReference.DOWNLOAD];
export const selectDepositsForDownloadLoading = (state: AppState) => state.deposits.loading[DepositsReference.DOWNLOAD];

export const selectCurrentProductCurrencyDeposits = createSelector(
  [selectDeposits, selectProduct],
  (deposits, product) => {
    return deposits.filter((deposit) => deposit.currency === product.currency);
  }
);

export const selectCurrentProductCurrencyCompletedDeposits = createSelector(
  [selectCurrentProductCurrencyDeposits],
  (deposits) => {
    return deposits.filter((deposit) => deposit.nbConf >= 2);
  }
);

export const selectCurrentProductCurrencyDepositsForDownload = createSelector(
  [selectDepositsForDownload, selectProduct],
  (deposits, product) => {
    return deposits.filter((deposit) => deposit.currency === product.currency);
  }
);

export const selectCurrentProductCurrencyCompletedDepositsForDownload = createSelector(
  [selectCurrentProductCurrencyDepositsForDownload],
  (deposits) => {
    return deposits.filter((deposit) => deposit.nbConf >= 2);
  }
);

export const selectTotalDepositAmountValue = createSelector(
  [selectCurrentProductCurrencyCompletedDeposits],
  (deposits) => {
    return deposits.reduce((acc, deposit) => acc + deposit.amount, 0);
  }
);

export const selectTotalDepositAmountValueForDownload = createSelector(
  [selectCurrentProductCurrencyCompletedDepositsForDownload],
  (deposits) => {
    return deposits.reduce((acc, deposit) => acc + deposit.amount, 0);
  }
);

export const selectNetDepositAmountValue = createSelector(
  [selectTotalDepositAmountValue, selectTotalWithdrawalAmountValue],
  (totalDeposits, totalWithdrawals) => {
    return totalDeposits - totalWithdrawals;
  }
);

export const selectRecentDeposits = createSelector([selectDeposits], (deposits) => {
  const visiblePeriod = 172_800_000;
  const visibleSince = Date.now() - visiblePeriod;

  return deposits.filter((deposit) => deposit.nbConf < 2 || deposit.timestamp > visibleSince);
});
