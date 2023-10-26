import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { FeesReference } from '~/types/feesTypes';
import { AppThunkAction } from '~/store/types';
import { selectProductType } from '~/store/Market/selectors';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';
import { toSeconds } from '~/services/DateFormat/dateFormatService';

import { LoadFeesSocketReq, LoadFeesReq } from './types';

export const loadAllTimeFeesRequest = createAction<LoadFeesSocketReq>('feesHistory/loadAllTimeFeesRequestMain');
export const loadAllTimeFees = ({ productType: product }: LoadFeesReq): AppThunkAction => {
  return (dispatch, getState) => {
    const productType = product || selectProductType(getState());

    const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_FEES_HISTORY, {
      productType,
      startTime: 0,
      endTime: toSeconds(Date.now()),
      reference: FeesReference.ALL_TIME
    });

    dispatch(loadAllTimeFeesRequest(reqPayload));
  };
};

export const loadTimeRangeFeesRequest = createAction<LoadFeesSocketReq>('feesHistory/loadTimeRangeFeesRequestMain');
export const loadTimeRangeFees = ({ startTime, endTime }: LoadFeesReq): AppThunkAction => {
  return (dispatch, getState) => {
    const productType = selectProductType(getState());

    const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_FEES_HISTORY, {
      productType,
      startTime: toSeconds(startTime || 0),
      endTime: toSeconds(endTime || Date.now()),
      reference: FeesReference.TIME_RANGE
    });

    dispatch(loadTimeRangeFeesRequest(reqPayload));
  };
};
