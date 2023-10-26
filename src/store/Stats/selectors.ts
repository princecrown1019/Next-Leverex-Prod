import { createSelector } from '@reduxjs/toolkit';

import { MAX_LEVERAGE } from '~/constants/leverageConstants';
import { ProductType } from '~/types/productTypes';
import { AppState } from '~/store/types';
import {
  selectCurrentProductLiveCutOffPrice,
  selectDynamicProductLiveCutOffPrice,
  selectProductType
} from '~/store/Market/selectors';
import { calculateCutOffChange } from '~/store/Stats/serializer';

export const selectStats = (state: AppState) => state.stats;
export const selectLastCutOffPrice = (state: AppState) => state.stats.lastCutOffPrice;
export const selectDailyVolumes = (state: AppState) => state.stats.dailyVolume;
export const selectOpenInterests = (state: AppState) => state.stats.openInterest;
export const selectNextCutOffTimes = (state: AppState) => state.stats.nextCutOffAt;
export const selectTradingStatsLoading = (state: AppState) => state.stats.loading.tradingStats;
export const selectSessionDataLoading = (state: AppState) => state.stats.loading.sessionData;
export const selectTradingsClosed = (state: AppState) => state.stats.closed;
export const selectVersionData = (state: AppState) => state.stats.version;

const selectLocalProductType = (_: AppState, productType: ProductType) => productType;

export const selectCurrentProductLastCutOffPrice = createSelector(
  [selectLastCutOffPrice, selectProductType],
  (lastCutOffPrices, productType) => {
    return lastCutOffPrices[productType] || 0;
  }
);

export const selectCurrentProductDailyVolume = createSelector(
  [selectDailyVolumes, selectProductType],
  (dailyVolumes, productType) => {
    return dailyVolumes[productType] || 0;
  }
);

export const selectCurrentProductOpenInterest = createSelector(
  [selectOpenInterests, selectProductType],
  (openInterests, productType) => {
    return openInterests[productType] || 0;
  }
);

export const selectCurrentProductSessionIm = createSelector(
  [selectCurrentProductLastCutOffPrice],
  (lastCutOffPrice) => {
    if (!lastCutOffPrice) return 0;

    return lastCutOffPrice / MAX_LEVERAGE;
  }
);

export const selectCurrentProductNextCutOffTime = createSelector(
  [selectNextCutOffTimes, selectProductType],
  (times, productType) => {
    return times[productType] || 0;
  }
);

export const selectCurrentProductTradingClosed = createSelector(
  [selectTradingsClosed, selectProductType],
  (closedProducts, productType) => {
    return closedProducts[productType];
  }
);

export const selectDynamicProductLastCutOffPrice = createSelector(
  [selectLastCutOffPrice, selectLocalProductType],
  (lastCutOffPrices, localProductType) => {
    return lastCutOffPrices[localProductType] || 0;
  }
);

export const selectDynamicProductDailyVolume = createSelector(
  [selectDailyVolumes, selectLocalProductType],
  (dailyVolumes, localProductType) => {
    return dailyVolumes[localProductType] || 0;
  }
);

export const selectCurrentProductCutOffChange = createSelector(
  [selectCurrentProductLastCutOffPrice, selectCurrentProductLiveCutOffPrice],
  calculateCutOffChange
);

export const selectDynamicProductCutOffChange = createSelector(
  [selectDynamicProductLastCutOffPrice, selectDynamicProductLiveCutOffPrice],
  calculateCutOffChange
);
