import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { BalancesHistoryReference } from '~/types/balancesHistoryTypes';
import { AppThunkAction } from '~/store/types';
import { selectProductType } from '~/store/Market/selectors';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';
import { toSeconds } from '~/services/DateFormat/dateFormatService';

import { LoadTimeRangeBalancesSocketReq, LoadTimeRangeBalancesReq } from './types';

export const loadBalancesHistoryRequest = createAction<LoadTimeRangeBalancesSocketReq>(
  'balancesHistory/loadBalancesHistoryRequestMain'
);
export const loadBalancesHistory = (payload: LoadTimeRangeBalancesReq): AppThunkAction => {
  return (dispatch, getState) => {
    const productType = selectProductType(getState());

    const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_TRADE_SESSION_HISTORY, {
      productType,
      startTime: toSeconds(payload.startTime),
      endTime: toSeconds(payload.endTime || Date.now()),
      reference: BalancesHistoryReference.BALANCES
    });

    dispatch(loadBalancesHistoryRequest(reqPayload));
  };
};
