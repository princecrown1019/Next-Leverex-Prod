import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { DepositsReference } from '~/types/depositsTypes';
import { AppThunkAction } from '~/store/types';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';
import { toSeconds } from '~/services/DateFormat/dateFormatService';

import { LoadDepositAddressSocketReq, LoadDepositsDownloadReq, LoadDepositsSocketReq } from './types';

export const loadDepositsRequest = createAction<LoadDepositsSocketReq>('deposits/loadDepositsRequestMain');
export const loadDeposits = (): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_DEPOSITS, {});

  return (dispatch) => {
    dispatch(loadDepositsRequest(reqPayload));
  };
};

export const loadDepositsForDownloadRequest = createAction<LoadDepositsSocketReq>(
  'deposits/loadDepositsForDownloadRequestMain'
);
export const loadDepositsForDownload = ({ startTime, endTime }: LoadDepositsDownloadReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_DEPOSITS, {
    reference: DepositsReference.DOWNLOAD,
    startTime: toSeconds(startTime),
    endTime: toSeconds(endTime)
  });

  return (dispatch) => {
    dispatch(loadDepositsForDownloadRequest(reqPayload));
  };
};

export const loadDepositAddressRequest = createAction<LoadDepositAddressSocketReq>(
  'deposits/loadDepositAddressRequestMain'
);
export const loadDepositAddress = (): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_DEPOSIT_ADDRESS, {});

  return (dispatch) => {
    dispatch(loadDepositAddressRequest(reqPayload));
  };
};
