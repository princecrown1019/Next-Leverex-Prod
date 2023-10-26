import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';

import { AppState, AppThunkDispatch } from '~/store/types';
import {
  selectTradeDayTradesCount,
  selectTradesHistoryOffset,
  selectTradesHistoryEndTime,
  selectTradesHistoryStartTime,
  selectCsvTradesHistoryOffset
} from '~/store/TradesHistory/selectors';
import { toMilliseconds, toUTCStringDate } from '~/services/DateFormat/dateFormatService';

import { tradesHistoryActions } from './slice';

export const createTradesHistoryMiddleware = () => {
  return ({ dispatch, getState }: MiddlewareAPI<AppThunkDispatch, AppState>) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      if (action.type === tradesHistoryActions.loadOrdersHistoryFulfilled.type && action.payload.orders?.length) {
        const state = getState();
        const date = toUTCStringDate(toMilliseconds(action.payload.orders[0].timestamp));

        const offset = selectTradesHistoryOffset(state) + action.payload.orders.length;
        const count = selectTradeDayTradesCount(state, date) || 0;
        const endTime = selectTradesHistoryEndTime(state);
        const startTime = selectTradesHistoryStartTime(state);

        if (!endTime || !startTime || offset >= count) return next(action);

        dispatch(tradesHistoryActions.loadOrdersHistory({ offset, startTime, endTime, date }));
      }

      if (
        action.type === tradesHistoryActions.loadCsvOrdersHistoryFulfilled.type &&
        action.payload.orders?.length === 100
      ) {
        const offset = selectCsvTradesHistoryOffset(getState()) + action.payload.orders.length;

        dispatch(tradesHistoryActions.loadCsvOrdersHistory({ offset }));
      }

      return next(action);
    };
  };
};
