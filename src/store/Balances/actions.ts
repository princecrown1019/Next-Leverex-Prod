import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { AppThunkAction } from '~/store/types';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';

import { BalancesSocketReq } from './types';

export const loadBalancesRequest = createAction<BalancesSocketReq>('balances/loadBalancesRequestMain');
export const loadBalances = (): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_BALANCE, {});

  return (dispatch) => {
    dispatch(loadBalancesRequest(reqPayload));
  };
};
