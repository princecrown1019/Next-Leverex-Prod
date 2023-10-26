import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '~/store/types';
import { FeesReference } from '~/types/feesTypes';
import { selectProductType } from '~/store/Market/selectors';

export const selectFeesHistory = (state: AppState) => state.feesHistory;
export const selectAllTimeFeesLoading = (state: AppState) => state.feesHistory.loading[FeesReference.ALL_TIME];
export const selectAllTimeFeesError = (state: AppState) => state.feesHistory.error[FeesReference.ALL_TIME];
export const selectTimeRangeFeesLoading = (state: AppState) => state.feesHistory.loading[FeesReference.TIME_RANGE];
export const selectTimeRangeFeesError = (state: AppState) => state.feesHistory.error[FeesReference.TIME_RANGE];

export const selectAllTimeFees = createSelector([selectFeesHistory, selectProductType], (fees, productType) => {
  return fees[FeesReference.ALL_TIME]?.[productType] || 0;
});

export const selectTimeRangeFees = createSelector([selectFeesHistory, selectProductType], (fees, productType) => {
  return fees[FeesReference.TIME_RANGE]?.[productType] || 0;
});
