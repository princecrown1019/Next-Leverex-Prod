import { createSelector } from '@reduxjs/toolkit';

import { WithdrawalsReference, WithdrawalStatus } from '~/types/withdrawalsTypes';
import { AppState } from '~/store/types';
import { selectProduct, selectProductType } from '~/store/Market/selectors';

const withdrawalStatusesAsCompleted = new Set([
  WithdrawalStatus.PENDING,
  WithdrawalStatus.BROADCASTED,
  WithdrawalStatus.COMPLETED
]);

export const selectWithdrawals = (state: AppState) => state.withdrawals.withdrawals;
export const selectWithdrawalsLoading = (state: AppState) => state.withdrawals.loading.withdrawals;
export const selectWithdrawalLoading = (state: AppState) => state.withdrawals.loading.withdrawal;
export const selectWithdrawalError = (state: AppState) => state.withdrawals.error.withdrawal;
export const selectCancellingWithdrawalIds = (state: AppState) => state.withdrawals.cancellingIds;
export const selectWithdrawalsForDownload = (state: AppState) => state.withdrawals[WithdrawalsReference.DOWNLOAD];
export const selectWithdrawalsForDownloadLoading = (state: AppState) =>
  state.withdrawals.loading[WithdrawalsReference.DOWNLOAD];

export const selectCurrentProductCurrencyWithdrawals = createSelector(
  [selectWithdrawals, selectProduct],
  (withdrawals, product) => {
    return withdrawals.filter((withdrawal) => withdrawal.currency === product.currency);
  }
);

export const selectCurrentProductCurrencyWithdrawalsForDownload = createSelector(
  [selectWithdrawalsForDownload, selectProduct],
  (withdrawals, product) => {
    return withdrawals.filter((withdrawal) => withdrawal.currency === product.currency);
  }
);

export const selectCurrentProductCurrencyCompletedWithdrawals = createSelector(
  [selectCurrentProductCurrencyWithdrawals],
  (withdrawals) => withdrawals.filter((withdrawal) => withdrawalStatusesAsCompleted.has(withdrawal.status))
);

export const selectCurrentProductCurrencyCompletedWithdrawalsForDownload = createSelector(
  [selectCurrentProductCurrencyWithdrawalsForDownload, selectProduct],
  (withdrawals) => withdrawals.filter((withdrawal) => withdrawalStatusesAsCompleted.has(withdrawal.status))
);

export const selectTotalWithdrawalAmountValue = createSelector(
  [selectCurrentProductCurrencyCompletedWithdrawals, selectProductType],
  (withdrawals) => {
    return withdrawals.reduce((acc, withdrawal) => acc + Math.abs(withdrawal.amount), 0);
  }
);

export const selectTotalWithdrawalAmountValueForDownload = createSelector(
  [selectCurrentProductCurrencyCompletedWithdrawalsForDownload],
  (withdrawals) => {
    return withdrawals.reduce((acc, withdrawal) => acc + Math.abs(withdrawal.amount), 0);
  }
);

export const selectRecentWithdrawals = createSelector([selectWithdrawals], (withdrawals) => {
  const visiblePeriod = 172_800_000;
  const visibleSince = Date.now() - visiblePeriod;

  return withdrawals.filter(
    (withdrawal) =>
      withdrawal.status === WithdrawalStatus.ACCEPTED ||
      withdrawal.status === WithdrawalStatus.PENDING ||
      withdrawal.status === WithdrawalStatus.BROADCASTED ||
      (withdrawal.status === WithdrawalStatus.COMPLETED && withdrawal.timestamp > visibleSince)
  );
});
