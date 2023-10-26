import { createSelector } from '@reduxjs/toolkit';

import { Bar } from '~/libs/TradingView';
import { AppState } from '~/store/types';
import { ChartCandle } from '~/types/chartTypes';

export const selectPriceChart = (state: AppState) => state.priceChart;
export const selectPriceChartCandles = (state: AppState) => state.priceChart.candles;
export const selectPriceChartCandlesLoading = (state: AppState) => state.priceChart.loading.candles;
export const selectPriceChartLastTwoCandlesLoading = (state: AppState) => state.priceChart.loading.lastTwo;
export const selectPriceChartProductType = (state: AppState) => state.priceChart.productType;
export const selectPriceChartInterval = (state: AppState) => state.priceChart.interval;
export const selectPriceChartTimestampEnd = (state: AppState) => state.priceChart.timestampEnd;
export const selectPriceChartHasNext = (state: AppState) => state.priceChart.hasNext;

const selectIntervalTime = (_: AppState, intervalTime: number) => intervalTime;

export const selectPriceChartBars = createSelector([selectPriceChartCandles], (candles) => {
  if (!candles.length) return [];

  return candles.map((candle) => ({
    time: candle.timestamp,
    high: candle.high,
    close: candle.close,
    low: candle.low,
    volume: candle.volume,
    open: candle.open,
    productType: candle.productType
  })) as (Bar & Pick<ChartCandle<number>, 'productType'>)[];
});

export const selectPriceChartFirstBar = createSelector([selectPriceChartBars], (bars) => {
  if (!bars.length) return null;

  return bars[0];
});

export const selectPriceChartLastBar = createSelector([selectPriceChartBars], (bars) => {
  if (!bars.length) return null;

  return bars[bars.length - 1];
});

export const selectPriceChartLastTwoBars = createSelector([selectPriceChartBars], (bars) => {
  if (!bars.length) return [];

  return bars.slice(-2);
});

export const selectPriceChartNextBarTimestamp = createSelector(
  [selectPriceChartLastBar, selectIntervalTime],
  (lastBar, intervalTime) => {
    if (!lastBar) return null;

    return lastBar.time + intervalTime;
  }
);
