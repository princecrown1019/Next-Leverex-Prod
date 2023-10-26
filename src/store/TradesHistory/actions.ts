import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { AppThunkAction } from '~/store/types';
import { TradesHistoryReference } from '~/types/tradesHistoryTypes';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';
import { toSeconds } from '~/services/DateFormat/dateFormatService';
import {
  selectCsvTradesHistoryEndTime,
  selectCsvTradesHistoryOffset,
  selectCsvTradesHistoryStartTime,
  selectTradeDaysHistoryOffset,
  selectTradeDayTradesCount,
  selectTradesHistoryOffset
} from '~/store/TradesHistory/selectors';
import { selectProductType } from '~/store/Market/selectors';

import {
  LoadTradesSocketReq,
  LoadSessionsSocketReq,
  LoadTradesReq,
  LoadSessionsReq,
  LoadDaysSocketReq,
  LoadDaysReq,
  LoadCsvTradesSocketReq,
  LoadCsvTradesReq
} from './types';

export const loadOrdersHistoryRequest = createAction<LoadTradesSocketReq>('tradeHistory/loadOrdersHistoryRequestMain');
export const loadOrdersHistory = ({ limit = 100, date, ...payload }: LoadTradesReq): AppThunkAction => {
  return (dispatch, getState) => {
    const state = getState();

    const productType = selectProductType(state);
    const offset = payload.offset ?? selectTradesHistoryOffset(state);
    const tradesCount = selectTradeDayTradesCount(state, date);

    const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_TRADE_HISTORY, {
      offset,
      productType,
      limit: tradesCount ? Math.min(tradesCount - offset, limit) : limit,
      endTime: toSeconds(payload.endTime || Date.now()),
      startTime: toSeconds(payload.startTime)
    });

    dispatch(loadOrdersHistoryRequest(reqPayload));
  };
};

export const loadSessionsHistoryRequest = createAction<LoadSessionsSocketReq>(
  'tradeHistory/loadSessionsHistoryRequestMain'
);
export const loadSessionsHistory = (payload: LoadSessionsReq): AppThunkAction => {
  return (dispatch, getState) => {
    const productType = selectProductType(getState());

    const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_TRADE_SESSION_HISTORY, {
      productType,
      startTime: toSeconds(payload.startTime),
      endTime: toSeconds(payload.endTime || Date.now())
    });

    dispatch(loadSessionsHistoryRequest(reqPayload));
  };
};

export const loadDaysHistoryRequest = createAction<LoadDaysSocketReq>('tradeHistory/loadDaysHistoryRequestMain');
export const loadDaysHistory = ({ limit = 60, ...payload }: LoadDaysReq): AppThunkAction => {
  return (dispatch, getState) => {
    const state = getState();

    const offset = payload.offset ?? selectTradeDaysHistoryOffset(state);
    const productType = selectProductType(state);

    const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_TRADE_DAYS_HISTORY, { productType, limit, offset });

    dispatch(loadDaysHistoryRequest(reqPayload));
  };
};

export const loadCsvOrdersHistoryRequest = createAction<LoadCsvTradesSocketReq>(
  'tradeHistory/loadCsvOrdersHistoryRequestMain'
);
export const loadCsvOrdersHistory = ({ limit = 100, ...payload }: LoadCsvTradesReq): AppThunkAction => {
  return (dispatch, getState) => {
    const state = getState();

    const productType = selectProductType(state);
    const offset = payload.offset ?? selectCsvTradesHistoryOffset(state);
    const startTime = selectCsvTradesHistoryStartTime(state);
    const endTime = selectCsvTradesHistoryEndTime(state);

    const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_TRADE_HISTORY, {
      startTime: payload.startTime ? toSeconds(payload.startTime) : startTime,
      endTime: payload.endTime ? toSeconds(payload.endTime) : endTime,
      limit,
      offset,
      productType,
      reference: TradesHistoryReference.DOWNLOAD
    });

    dispatch(loadCsvOrdersHistoryRequest(reqPayload));
  };
};
