import { createAction } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { WithdrawalsReference } from '~/types/withdrawalsTypes';
import { AppThunkAction } from '~/store/types';
import { buildMainSocketReq } from '~/services/SocketFormat/socketFormatService';
import { toSeconds } from '~/services/DateFormat/dateFormatService';

import {
  CancelWithdrawalSocketReq,
  CancelWithdrawalReq,
  LoadWithdrawalsSocketReq,
  WithdrawalReq,
  WithdrawalSocketReq,
  LoadWithdrawalsDownloadReq
} from './types';

export const loadWithdrawalsRequest = createAction<LoadWithdrawalsSocketReq>('withdrawals/loadWithdrawalsRequestMain');
export const loadWithdrawals = (): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_WITHDRAWALS, {});

  return (dispatch) => {
    dispatch(loadWithdrawalsRequest(reqPayload));
  };
};

export const loadWithdrawalsForDownloadRequest = createAction<LoadWithdrawalsSocketReq>(
  'withdrawals/loadWithdrawalsForDownloadRequestMain'
);
export const loadWithdrawalsForDownload = ({ startTime, endTime }: LoadWithdrawalsDownloadReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.LOAD_WITHDRAWALS, {
    reference: WithdrawalsReference.DOWNLOAD,
    startTime: toSeconds(startTime),
    endTime: toSeconds(endTime)
  });

  return (dispatch) => {
    dispatch(loadWithdrawalsForDownloadRequest(reqPayload));
  };
};

export const withdrawRequest = createAction<WithdrawalSocketReq>('withdrawals/withdrawRequestMain');
export const withdraw = ({ amount, ...restPayload }: WithdrawalReq<number>): AppThunkAction => {
  const payload = { amount: amount.toString(), ...restPayload };
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.WITHDRAW_LIQUID, payload);

  return (dispatch) => {
    dispatch(withdrawRequest(reqPayload));
  };
};

export const cancelWithdrawalRequest = createAction<CancelWithdrawalSocketReq>(
  'withdrawals/cancelWithdrawalRequestMain'
);
export const cancelWithdrawal = (payload: CancelWithdrawalReq): AppThunkAction => {
  const reqPayload = buildMainSocketReq(SocketMainEndpoint.CANCEL_WITHDRAWAL, payload);

  return (dispatch) => {
    dispatch(cancelWithdrawalRequest(reqPayload));
  };
};
