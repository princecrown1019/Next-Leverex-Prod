import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { ProfitLossReference } from '~/types/profitLossTypes';
import { AppThunkAction } from '~/store/types';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';
import { toSeconds } from '~/services/DateFormat/dateFormatService';

import { LoadPLReq, LoadPLSocketReq } from './types';

export const loadDayRequest = createAction<LoadPLSocketReq>('profitsLosses/loadDayRequestMain');
export const loadDay = (payload: LoadPLReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_HISTORICAL_PL, {
    ...payload,
    reference: ProfitLossReference.DAY,
    startTime: toSeconds(new Date().setUTCHours(0, 0, 0, 0)),
    endTime: toSeconds(new Date().setUTCHours(23, 59, 59, 999))
  });

  return (dispatch) => {
    dispatch(loadDayRequest(reqPayload));
  };
};

export const loadWeekRequest = createAction<LoadPLSocketReq>('profitsLosses/loadWeekRequestMain');
export const loadWeek = (payload: LoadPLReq): AppThunkAction => {
  const endTime = Date.now();

  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_HISTORICAL_PL, {
    ...payload,
    reference: ProfitLossReference.WEEK,
    startTime: toSeconds(new Date(endTime - 604_800_000).setUTCHours(0, 0, 0, 0)),
    endTime: toSeconds(new Date(endTime).setUTCHours(23, 59, 59, 999))
  });

  return (dispatch) => {
    dispatch(loadWeekRequest(reqPayload));
  };
};

export const loadMonthRequest = createAction<LoadPLSocketReq>('profitsLosses/loadMonthRequestMain');
export const loadMonth = (payload: LoadPLReq): AppThunkAction => {
  const endTime = Date.now();

  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_HISTORICAL_PL, {
    ...payload,
    reference: ProfitLossReference.MONTH,
    startTime: toSeconds(new Date(endTime - 2_629_800_000).setUTCHours(0, 0, 0, 0)),
    endTime: toSeconds(new Date(endTime).setUTCHours(23, 59, 59, 999))
  });

  return (dispatch) => {
    dispatch(loadMonthRequest(reqPayload));
  };
};

export const loadYearRequest = createAction<LoadPLSocketReq>('profitsLosses/loadYearRequestMain');
export const loadYear = (payload: LoadPLReq): AppThunkAction => {
  const endTime = Date.now();

  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_HISTORICAL_PL, {
    ...payload,
    reference: ProfitLossReference.YEAR,
    startTime: toSeconds(new Date(endTime - 31_622_400_000).setUTCHours(0, 0, 0, 0)),
    endTime: toSeconds(new Date(endTime).setUTCHours(23, 59, 59, 999))
  });

  return (dispatch) => {
    dispatch(loadYearRequest(reqPayload));
  };
};

export const loadAllTimeRequest = createAction<LoadPLSocketReq>('profitsLosses/loadAllTimeRequestMain');
export const loadAllTime = (payload: LoadPLReq): AppThunkAction => {
  const endTime = Date.now();

  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_HISTORICAL_PL, {
    ...payload,
    reference: ProfitLossReference.ALL_TIME,
    startTime: 0,
    endTime: toSeconds(new Date(endTime).setUTCHours(23, 59, 59, 999))
  });

  return (dispatch) => {
    dispatch(loadAllTimeRequest(reqPayload));
  };
};
