import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '~/store/types';
import { selectProductType } from '~/store/Market/selectors';
import { selectMargin } from '~/store/Balances/selectors';

export const selectTradeEstimations = (state: AppState) => state.tradeEstimations;
export const selectProductFee = (state: AppState) => state.tradeEstimations.productFee?.fee;
export const selectProductIm = (state: AppState) => state.tradeEstimations.productFee?.im;
export const selectProductFeeLoading = (state: AppState) => state.tradeEstimations.loading.productFee;
export const selectMaxTradeAmounts = (state: AppState) => state.tradeEstimations.maxTradeAmount;
export const selectMaxTradeAmountLoading = (state: AppState) => state.tradeEstimations.loading.maxTradeAmount;
export const selectMaxTradeAmountError = (state: AppState) => state.tradeEstimations.error.maxTradeAmount;
export const selectTradeEstimationsLoading = (state: AppState) => state.tradeEstimations.productFee;
export const selectEstimatedImLoading = (state: AppState) => state.tradeEstimations.loading.imEstimation;
export const selectEstimatedImFee = (state: AppState) => state.tradeEstimations.imEstimation?.feeAmount;
export const selectEstimatedImReservation = (state: AppState) =>
  state.tradeEstimations.imEstimation?.expectedImReservation;

export const selectMaxTradeAmount = createSelector(
  [selectMaxTradeAmounts, selectProductType],
  (maxTradeAmounts, productType) => {
    return maxTradeAmounts[productType];
  }
);

export const selectMaxTradeAmountLastUpdatedAt = createSelector(
  [selectMaxTradeAmounts, selectProductType],
  (maxTradeAmounts, productType) => {
    return maxTradeAmounts[productType]?.lastUpdateAt || 0;
  }
);

export const selectEstimatedImChange = createSelector(
  [selectEstimatedImReservation, selectMargin],
  (imReservation, margin) => {
    return imReservation ? imReservation - margin : 0;
  }
);
