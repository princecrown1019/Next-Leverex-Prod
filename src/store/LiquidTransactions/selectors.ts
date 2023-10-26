import { createSelector } from '@reduxjs/toolkit';

import { LiquidTransaction } from '~/types/liquidTransactionTypes';
import { FilterState } from '~/types/filterTypes';
import { AppState } from '~/store/types';
import { filterArray } from '~/services/Filter/filterService';
import {
  selectDeposits,
  selectDepositsForDownload,
  selectDepositsForDownloadLoading,
  selectDepositsLoading
} from '~/store/Deposits/selectors';
import {
  selectWithdrawals,
  selectWithdrawalsForDownload,
  selectWithdrawalsForDownloadLoading,
  selectWithdrawalsLoading
} from '~/store/Withdrawals/selectors';
import { serializeWithdrawalsAndDeposits } from '~/store/LiquidTransactions/serializer';

const selectFilterState = (_: AppState, filterState: FilterState<LiquidTransaction<number>>[]) => filterState;

export const selectLiquidTransactionsLoading = createSelector(
  [selectWithdrawalsLoading, selectDepositsLoading],
  (withdrawalsLoading, depositsLoading) => withdrawalsLoading || depositsLoading
);

export const selectLiquidTransactionsForDownload = createSelector(
  [selectDepositsForDownload, selectWithdrawalsForDownload],
  serializeWithdrawalsAndDeposits
);

export const selectLiquidTransactionsForDownloadLoading = createSelector(
  [selectWithdrawalsForDownloadLoading, selectDepositsForDownloadLoading],
  (withdrawalsLoading, depositsLoading) => withdrawalsLoading || depositsLoading
);

export const selectLiquidTransactions = createSelector(
  [selectDeposits, selectWithdrawals],
  serializeWithdrawalsAndDeposits
);

export const selectLiquidTransactionsFiltered = createSelector(
  [selectLiquidTransactions, selectFilterState],
  filterArray
);
