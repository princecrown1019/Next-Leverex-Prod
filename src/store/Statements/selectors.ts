import { createSelector } from '@reduxjs/toolkit';

import { selectCsvTradesHistoryLoading, selectTradesHistorySummaryForDownload } from '~/store/TradesHistory/selectors';
import { selectTotalWithdrawalAmountValueForDownload } from '~/store/Withdrawals/selectors';
import { selectTotalDepositAmountValueForDownload } from '~/store/Deposits/selectors';
import { selectBalanceHistoryLoading, selectBalancesRangeHistory } from '~/store/BalancesHistory/selectors';
import { selectLiquidTransactionsForDownloadLoading } from '~/store/LiquidTransactions/selectors';

export const selectStatementLoading = createSelector(
  [selectCsvTradesHistoryLoading, selectLiquidTransactionsForDownloadLoading, selectBalanceHistoryLoading],
  (tradeHistoryLoading, transfersHistoryLoading, balancesHistoryLoading) => {
    return tradeHistoryLoading || transfersHistoryLoading || balancesHistoryLoading;
  }
);

export const selectAccountSummaryStatement = createSelector(
  [
    selectTradesHistorySummaryForDownload,
    selectTotalWithdrawalAmountValueForDownload,
    selectTotalDepositAmountValueForDownload,
    selectBalancesRangeHistory
  ],
  (ordersSummary, withdrawalsTotalAmount, depositsTotalAmount, balances) => {
    return {
      openingBalance: balances.openingBalance,
      closingBalance: balances.closingBalance,
      netBalanceChange: balances.closingBalance - balances.openingBalance,
      deposits: depositsTotalAmount,
      withdrawals: -withdrawalsTotalAmount,
      fees: ordersSummary.fees,
      pnl: ordersSummary.pnl
    };
  }
);

export const selectPositionsSummaryStatement = createSelector(
  [selectTradesHistorySummaryForDownload],
  (ordersSummary) => ({
    ...ordersSummary,
    netExposureChange: ordersSummary.closingExposure - ordersSummary.openingExposure
  })
);
