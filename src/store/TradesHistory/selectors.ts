import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '~/store/types';
import { Order, OrderStatus, RolloverType } from '~/types/orderTypes';
import { TradeDay, TradeSession, TradesHistoryReference } from '~/types/tradesHistoryTypes';
import { FilterState } from '~/types/filterTypes';
import { selectSessionProfitLoss } from '~/store/ProfitsLosses/selectors';
import { selectCurrentProductNextCutOffTime, selectCurrentProductSessionIm } from '~/store/Stats/selectors';
import { selectCurrentProductLiveCutOffPrice } from '~/store/Market/selectors';
import { serializeOrdersProfitLoss } from '~/store/Orders/serializer';
import { filterArray } from '~/services/Filter/filterService';
import { fixDecimals } from '~/services/NumberFormat/numberFormatService';

import { serializeDaysSessionOrdersHistory } from './serializer';

const filterDaysState: Pick<FilterState<TradeDay<number> | TradeSession<number>>, 'key' | 'keyValue'>[] = [
  {
    key: 'clientHasSells',
    keyValue: true
  },
  {
    key: 'clientHasBuys',
    keyValue: true
  },
  {
    key: 'rolloverType',
    keyValue: RolloverType.NOT_ROLLOVER
  },
  {
    key: 'hasDefault',
    keyValue: true
  },
  {
    key: 'hasLiquidation',
    keyValue: true
  }
];

const getSessionsFilterState = (filterState: FilterState<Order<number>>[]) => {
  return filterState.map((criteria, idx) => ({ ...criteria, ...filterDaysState[idx] }));
};

export const selectTradesHistory = (state: AppState) => state.tradesHistory.orders;
export const selectTradesHistoryLoading = (state: AppState) => state.tradesHistory.loading.orders;
export const selectTradesHistoryOffset = (state: AppState) => state.tradesHistory.offset.orders;
export const selectTradesHistoryHasNext = (state: AppState) => state.tradesHistory.hasNext.orders;
export const selectTradesHistoryEndTime = (state: AppState) => state.tradesHistory.endTime.orders;
export const selectTradesHistoryStartTime = (state: AppState) => state.tradesHistory.startTime.orders;
export const selectOpenTradeSession = (state: AppState) => state.tradesHistory.openSession;
export const selectTradeSessionHistory = (state: AppState) => state.tradesHistory.sessions;
export const selectTradeSessionsHistoryLoading = (state: AppState) => state.tradesHistory.loading.sessions;
export const selectTradeSessionsHistoryOffset = (state: AppState) => state.tradesHistory.offset.sessions;
export const selectTradeSessionsHistoryHasNext = (state: AppState) => state.tradesHistory.hasNext.sessions;
export const selectTradeDaysHistory = (state: AppState) => state.tradesHistory.days;
export const selectTradeDaysHistoryLoading = (state: AppState) => state.tradesHistory.loading.days;
export const selectTradeDaysHistoryHasNext = (state: AppState) => state.tradesHistory.hasNext.days;
export const selectTradeDaysHistoryOffset = (state: AppState) => state.tradesHistory.offset.days;
export const selectCsvTradesHistory = (state: AppState) => state.tradesHistory[TradesHistoryReference.DOWNLOAD];
export const selectCsvTradesHistoryLoading = (state: AppState) =>
  state.tradesHistory.loading[TradesHistoryReference.DOWNLOAD];
export const selectCsvTradesHistoryOffset = (state: AppState) =>
  state.tradesHistory.offset[TradesHistoryReference.DOWNLOAD];
export const selectCsvTradesHistoryHasNext = (state: AppState) =>
  state.tradesHistory.hasNext[TradesHistoryReference.DOWNLOAD];
export const selectCsvTradesHistoryEndTime = (state: AppState) =>
  state.tradesHistory.endTime[TradesHistoryReference.DOWNLOAD];
export const selectCsvTradesHistoryStartTime = (state: AppState) =>
  state.tradesHistory.startTime[TradesHistoryReference.DOWNLOAD];

const selectDayDate = (_: AppState, date: string) => date;
const selectFilterOrdersState = (_: AppState, filterState: FilterState<Order<number>>[]) => filterState;

export const selectTradesHistoryWithPNL = createSelector(
  [selectTradesHistory, selectCurrentProductSessionIm, selectCurrentProductLiveCutOffPrice],
  (sessionOrders, sessionIm, livePCutOffPrice) => {
    return serializeOrdersProfitLoss(sessionOrders, sessionIm, livePCutOffPrice);
  }
);

export const selectTradesHistoryFiltered = createSelector(
  [selectTradesHistoryWithPNL, selectFilterOrdersState],
  filterArray
);

export const selectTradeSessionHistoryWithEndTime = createSelector(
  [selectTradeSessionHistory, selectCurrentProductNextCutOffTime],
  (sessions, nextCutOffAt) => {
    return sessions.map((session) => ({ ...session, timeEnd: session.timeEnd || nextCutOffAt }));
  }
);

export const selectTradeSessionHistoryFiltered = createSelector(
  [selectTradeSessionHistoryWithEndTime, selectFilterOrdersState],
  (sessions, filterState) => {
    const state = getSessionsFilterState(filterState);

    return filterArray(sessions, state);
  }
);

export const selectTradeDaysSessionOrdersHistory = createSelector(
  [
    selectTradeDaysHistory,
    selectCurrentProductNextCutOffTime,
    selectTradeSessionHistoryWithEndTime,
    selectTradesHistoryWithPNL
  ],
  serializeDaysSessionOrdersHistory
);

export const selectTradeDaysSessionOrdersHistoryWithFiltered = createSelector(
  [
    selectTradeDaysHistory,
    selectCurrentProductNextCutOffTime,
    selectTradeSessionHistoryFiltered,
    selectTradesHistoryFiltered
  ],
  serializeDaysSessionOrdersHistory
);

export const selectOpenSession = createSelector(
  [selectOpenTradeSession, selectCurrentProductNextCutOffTime, selectSessionProfitLoss, selectFilterOrdersState],
  (session, nextCutOffAt, sessionProfitLoss, filterState) => {
    if (!session) return null;

    const state = getSessionsFilterState(filterState);
    const [filteredSession] = filterArray(
      [{ ...session, pnl: session.pnl + sessionProfitLoss, timeEnd: nextCutOffAt }],
      state
    );

    return filteredSession || null;
  }
);

export const selectTradeDaysSessionOrdersHistoryFiltered = createSelector(
  [selectTradeDaysSessionOrdersHistoryWithFiltered, selectFilterOrdersState],
  (days, filterState) => {
    const state = getSessionsFilterState(filterState);

    return filterArray(days, state);
  }
);

export const selectTradeDayTradesCount = createSelector(
  [selectTradeDaysSessionOrdersHistory, selectDayDate],
  (days, date) => {
    return days.find((day) => day.date === date)?.nbTrades || null;
  }
);

export const selectCsvTradesHistoryFiltered = createSelector(
  [selectCsvTradesHistory, selectFilterOrdersState],
  (orders, filterState) => {
    return filterArray(orders, filterState);
  }
);

export const selectTradesHistoryForDownload = createSelector(
  [selectCsvTradesHistory, selectCurrentProductSessionIm, selectCurrentProductLiveCutOffPrice],
  (sessionOrders, sessionIm, livePCutOffPrice) => {
    return serializeOrdersProfitLoss(sessionOrders, sessionIm, livePCutOffPrice);
  }
);

export const selectTradesHistorySummaryForDownload = createSelector([selectTradesHistoryForDownload], (orders) => {
  const lastIdx = orders.length - 1;

  let fees = 0;
  let pnl = 0;
  let volume = 0;
  let openingExposure = 0;
  let closingExposure = 0;

  if (!orders.length) return { fees, pnl, volume, openingExposure, closingExposure };

  for (const [idx, { fee, tradePnl, quantity, rolloverType, referenceExposure }] of orders.entries()) {
    fees += fee;
    pnl += tradePnl;

    const exposure = Number(fixDecimals(rolloverType !== RolloverType.NOT_ROLLOVER ? quantity : referenceExposure, 8));

    if (rolloverType === RolloverType.NOT_ROLLOVER) {
      volume += Math.abs(quantity);
    }

    if (!idx) {
      closingExposure = exposure;
    } else if (idx === lastIdx) {
      openingExposure = rolloverType === RolloverType.NOT_ROLLOVER ? 0 : quantity;
    }
  }

  return { fees, pnl, volume, openingExposure, closingExposure };
});

export const selectTradesHistoryDownloadHasOpenTrade = createSelector([selectTradesHistoryForDownload], (orders) => {
  return orders[0]?.status === OrderStatus.PENDING;
});

export const selectTradesHistoryTotalPnlForDownload = createSelector([selectCsvTradesHistory], (orders) => {
  if (!orders.length) return 0;

  return orders.reduce((acc, order) => acc + order.tradePnl, 0);
});
