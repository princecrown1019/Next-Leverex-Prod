import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { AppThunkAction } from '~/store/types';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';

import {
  RemoveReq,
  WhitelistReq,
  RemoveAddressSocketReq,
  LoadAddressesSocketReq,
  WhitelistAddressSocketReq
} from './types';

export const loadAddressesRequest = createAction<LoadAddressesSocketReq>('addresses/loadAddressesRequestMain');
export const loadAddresses = (): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_ADDRESSES, {});

  return (dispatch) => {
    dispatch(loadAddressesRequest(reqPayload));
  };
};

export const whitelistAddressRequest = createAction<WhitelistAddressSocketReq>('addresses/whitelistAddressRequestMain');
export const whitelistAddress = (payload: WhitelistReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.CREATE_ADDRESS, payload);

  return (dispatch) => {
    dispatch(whitelistAddressRequest(reqPayload));
  };
};

export const removeAddressRequest = createAction<RemoveAddressSocketReq>('addresses/removeAddressRequestMain');
export const removeAddress = (payload: RemoveReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.REMOVE_ADDRESS, payload);

  return (dispatch) => {
    dispatch(removeAddressRequest(reqPayload));
  };
};
