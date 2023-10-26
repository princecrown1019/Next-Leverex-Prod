import { createSelector } from '@reduxjs/toolkit';

import { ProfitLossReference } from '~/types/profitLossTypes';
import { AppState } from '~/store/types';
import { selectSessionOrdersWithPNL, selectDynamicProductSessionOrdersWithPNL } from '~/store/Orders/selectors';
import { fixDecimals } from '~/services/NumberFormat/numberFormatService';

export const selectDayProfitLoss = (state: AppState) => state.profitsLosses[ProfitLossReference.DAY];
export const selectDayProfitLossLoading = (state: AppState) => state.profitsLosses.loading[ProfitLossReference.DAY];
export const selectWeekProfitLoss = (state: AppState) => state.profitsLosses[ProfitLossReference.WEEK];
export const selectWeekProfitLossLoading = (state: AppState) => state.profitsLosses.loading[ProfitLossReference.WEEK];
export const selectMonthProfitLoss = (state: AppState) => state.profitsLosses[ProfitLossReference.MONTH];
export const selectMonthProfitLossLoading = (state: AppState) => state.profitsLosses.loading[ProfitLossReference.MONTH];
export const selectYearProfitLoss = (state: AppState) => state.profitsLosses[ProfitLossReference.YEAR];
export const selectYearProfitLossLoading = (state: AppState) => state.profitsLosses.loading[ProfitLossReference.YEAR];
export const selectAllTimeProfitLoss = (state: AppState) => state.profitsLosses[ProfitLossReference.ALL_TIME];
export const selectAllTimeProfitLossLoading = (state: AppState) =>
  state.profitsLosses.loading[ProfitLossReference.ALL_TIME];

export const selectProfitLossLoading = createSelector(
  [
    selectDayProfitLossLoading,
    selectWeekProfitLossLoading,
    selectMonthProfitLossLoading,
    selectYearProfitLossLoading,
    selectAllTimeProfitLossLoading
  ],
  (dayLoading, weekLoading, monthLoading, yearLoading, allTimeLoading) => {
    return dayLoading || weekLoading || monthLoading || yearLoading || allTimeLoading;
  }
);

export const selectSessionProfitLoss = createSelector([selectSessionOrdersWithPNL], (sessionOrders) => {
  const pnlSum = sessionOrders.reduce((prev, curr) => prev + curr.tradePnl, 0);

  return Number(fixDecimals(pnlSum, 2));
});

export const selectDynamicProductSessionProfitLoss = createSelector(
  [selectDynamicProductSessionOrdersWithPNL],
  (sessionOrders) => {
    const pnlSum = sessionOrders.reduce((prev, curr) => prev + curr.tradePnl, 0);

    return Number(fixDecimals(pnlSum, 2));
  }
);
