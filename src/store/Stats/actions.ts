import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { AppThunkAction } from '~/store/types';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';

import { LoadTradingStatsSocketReq, LoadReq, LoadSessionOpenSocketReq, LoadVersionDataSocketReq } from './types';

export const loadVersionDataRequest = createAction<LoadVersionDataSocketReq>('stats/loadVersionDataRequestMain');
export const loadVersionData = (): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.CONNECTED, {});

  return (dispatch) => {
    dispatch(loadVersionDataRequest(reqPayload));
  };
};

export const loadSessionDataRequest = createAction<LoadSessionOpenSocketReq>('stats/loadSessionDataRequestMain');
export const loadSessionData = (payload: LoadReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.SESSION_OPEN, payload);

  return (dispatch) => {
    dispatch(loadSessionDataRequest(reqPayload));
  };
};

export const loadTradingStatsRequest = createAction<LoadTradingStatsSocketReq>('stats/loadTradingStatsRequestMain');
export const loadTradingStats = (payload: LoadReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_TRADING_STATS, payload);

  return (dispatch) => {
    dispatch(loadTradingStatsRequest(reqPayload));
  };
};
