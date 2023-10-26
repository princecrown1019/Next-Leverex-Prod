import { createSelector } from '@reduxjs/toolkit';

import { ProductSide, ProductType } from '~/types/productTypes';
import { AppState } from '~/store/types';
import { Order, RolloverType } from '~/types/orderTypes';
import { selectBuyingPower, selectMargin } from '~/store/Balances/selectors';
import { selectCurrentProductLastCutOffPrice, selectCurrentProductSessionIm } from '~/store/Stats/selectors';
import { selectCurrentProductLiveCutOffPrice, selectProductType } from '~/store/Market/selectors';
import { serializeOrdersProfitLoss } from '~/store/Orders/serializer';
import { fixDecimals } from '~/services/NumberFormat/numberFormatService';
import { MAX_LEVERAGE } from '~/constants/leverageConstants';

export const selectOrders = (state: AppState) => state.orders.orders;
export const selectOrdersLoading = (state: AppState) => state.orders.loading.orders;
export const selectOrdersOffset = (state: AppState) => state.orders.offset;
export const selectOrdersHasNext = (state: AppState) => state.orders.hasNext;
export const selectSessionOrders = (state: AppState) => state.orders.sessionOrders;
export const selectSessionOrdersLoading = (state: AppState) => state.orders.loading.sessionOrders;
export const selectCreateOrderLoading = (state: AppState) => state.orders.loading.create;
export const selectCreateOrderError = (state: AppState) => state.orders.error.create;
export const selectWorkingOrders = (state: AppState) => state.orders.workingOrders;
export const selectWorkingOrdersLoadingIds = (state: AppState) => state.orders.loadingWorkingIds;

const selectDynamicProductType = (_: AppState, productType: ProductType) => productType;
const selectReference = (_: AppState, reference: string) => reference;

export const selectWorkingOrderLoading = createSelector(
  [selectWorkingOrdersLoadingIds, selectReference],
  (ids, reference) => ids.includes(reference)
);

export const selectNetExposure = createSelector([selectSessionOrders], (sessionOrders) => {
  if (!sessionOrders.length) return 0;

  const { rolloverType, referenceExposure, quantity } = sessionOrders[0];

  return Number(fixDecimals(rolloverType !== RolloverType.NOT_ROLLOVER ? quantity : referenceExposure, 8));
});

export const selectSessionOrdersQuantity = createSelector([selectSessionOrders], (orders) => orders.length);

export const selectSessionOrdersWithPNL = createSelector(
  [selectSessionOrders, selectCurrentProductSessionIm, selectCurrentProductLiveCutOffPrice],
  (sessionOrders, sessionIm, livePCutOffPrice) => {
    return serializeOrdersProfitLoss(sessionOrders, sessionIm, livePCutOffPrice);
  }
);

export const selectDynamicProductSessionOrders = createSelector(
  [selectSessionOrders, selectDynamicProductType],
  (sessionOrders, productType) => {
    return sessionOrders.filter((order) => order.productType === productType);
  }
);

export const selectDynamicProductNetExposure = createSelector([selectDynamicProductSessionOrders], (sessionOrders) => {
  if (!sessionOrders.length) return 0;

  const { rolloverType, referenceExposure, quantity } = sessionOrders[0];

  return Number(fixDecimals(rolloverType !== RolloverType.NOT_ROLLOVER ? quantity : referenceExposure, 8));
});

export const selectDynamicProductSessionOrdersWithPNL = createSelector(
  [selectDynamicProductSessionOrders, selectCurrentProductSessionIm, selectCurrentProductLiveCutOffPrice],
  (sessionOrders, sessionIm, livePCutOffPrice) => {
    return serializeOrdersProfitLoss(sessionOrders, sessionIm, livePCutOffPrice);
  }
);

export const selectSessionOrdersWithDefaultsAndPNL = createSelector(
  [selectSessionOrdersWithPNL, selectProductType],
  (sessionOrdersWithPNL, productType) => {
    return sessionOrdersWithPNL.filter((order) => order.productType === productType);
  }
);

export const selectBreakEvenPrice = createSelector([selectSessionOrders, selectNetExposure], (orders, netExposure) => {
  if (!orders.length || !netExposure) return 0;

  const ordersSell = orders.filter((order) => order.side === ProductSide.SELL);
  const ordersBuy = orders.filter((order) => order.side === ProductSide.BUY);

  let buyPricesSum = 0;
  let sellPricesSum = 0;
  let buyQuantitiesSum = 0;
  let sellQuantitiesSum = 0;

  for (const order of ordersSell) {
    sellPricesSum += order.price * order.quantity;
    sellQuantitiesSum += order.quantity;
  }

  for (const order of ordersBuy) {
    buyPricesSum += order.price * order.quantity;
    buyQuantitiesSum += order.quantity;
  }

  const buyPricesAverage = buyPricesSum / buyQuantitiesSum;
  const sellPricesAverage = sellPricesSum / sellQuantitiesSum;

  if (!buyQuantitiesSum) return sellPricesAverage;
  if (!sellQuantitiesSum) return buyPricesAverage;

  const pl = Math.abs((sellPricesAverage - buyPricesAverage) * Math.min(Math.abs(sellQuantitiesSum), buyQuantitiesSum));

  return Number(fixDecimals(buyQuantitiesSum + sellQuantitiesSum, 8)) > 0
    ? buyPricesAverage + pl / (netExposure * MAX_LEVERAGE)
    : sellPricesAverage - pl / (netExposure * MAX_LEVERAGE);
});

export const selectNotionalExposure = createSelector(
  [selectCurrentProductLastCutOffPrice, selectNetExposure],
  (lastCuttOffPrice, netExposure) => {
    return lastCuttOffPrice * netExposure;
  }
);

export const selectLeverage = createSelector(
  [selectBuyingPower, selectMargin, selectSessionOrders],
  (buyingPower, margin, orders) => {
    if (!orders.length || !margin) return 0;
    if (!buyingPower) return MAX_LEVERAGE;

    return (margin / (buyingPower + margin)) * MAX_LEVERAGE;
  }
);

export const selectCurrentProductWorkingOrders = createSelector(
  [selectWorkingOrders, selectProductType],
  (workingOrders, productType) => {
    return workingOrders.filter((order) => order.productType === productType);
  }
);

export const selectCurrentProductWorkingOrdersQuantity = createSelector(
  [selectCurrentProductWorkingOrders],
  (orders) => orders.length
);

export const selectCurrentProductSellWorkingOrders = createSelector(
  [selectCurrentProductWorkingOrders],
  (workingOrders) => {
    return workingOrders.filter((order) => order.side === ProductSide.SELL);
  }
);

export const selectCurrentProductBuyWorkingOrders = createSelector(
  [selectCurrentProductWorkingOrders],
  (workingOrders) => {
    return workingOrders.filter((order) => order.side === ProductSide.BUY);
  }
);

export const selectCurrentProductWorkingNetExposure = createSelector(
  [selectCurrentProductWorkingOrders],
  (workingOrders) => {
    if (!workingOrders.length) return 0;

    return workingOrders.reduce((acc, order) => acc + order.quantity, 0);
  }
);

const groupByPrice = (orders: Order<number>[]) => {
  const result: Record<number, Order<number>[]> = {};

  for (const order of orders) {
    if (result[order.price]) {
      result[order.price].push(order);
    } else {
      result[order.price] = [order];
    }
  }

  return result;
};

export const selectCurrentProductSellWorkingOrdersGroupedByPrice = createSelector(
  [selectCurrentProductSellWorkingOrders],
  groupByPrice
);

export const selectCurrentProductBuyWorkingOrdersGroupedByPrice = createSelector(
  [selectCurrentProductBuyWorkingOrders],
  groupByPrice
);
