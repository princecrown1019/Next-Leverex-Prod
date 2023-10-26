import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { Currency } from '~/types/currencyTypes';
import { Withdrawal, WithdrawalsReference } from '~/types/withdrawalsTypes';

/*
 * Requests
 */

export type LoadWithdrawalsDownloadReq = {
  startTime: number;
  endTime: number;
  reference?: number;
};

export type WithdrawalReq<T> = {
  address: string;
  currency: Currency;
  amount: T;
};

export type CancelWithdrawalReq = {
  id: string;
};

/*
 * API Request
 */

export type LoadWithdrawalsSocketReq = SocketMainReq<
  SocketMainEndpoint.LOAD_WITHDRAWALS,
  LoadWithdrawalsDownloadReq | Record<string, unknown>
>;
export type WithdrawalSocketReq = SocketMainReq<SocketMainEndpoint.WITHDRAW_LIQUID, WithdrawalReq<string>>;
export type CancelWithdrawalSocketReq = SocketMainReq<SocketMainEndpoint.CANCEL_WITHDRAWAL, CancelWithdrawalReq>;

export type WithdrawalsSocketMainReqs = LoadWithdrawalsSocketReq | WithdrawalSocketReq | CancelWithdrawalSocketReq;

/*
 * Api Responses
 */

export type LoadWithdrawalsRes = {
  withdrawals: Withdrawal<string>[];
  reference: WithdrawalsReference;
};

export type WithdrawalRes = Withdrawal<string>;

export type UpdateWithdrawalRes = Withdrawal<string>;

/*
 * State
 */

type StateKeys = 'withdrawals' | 'withdrawal' | WithdrawalsReference;

export type WithdrawalsState = {
  withdrawals: Withdrawal<number>[];
  cancellingIds: string[];

  [WithdrawalsReference.DOWNLOAD]: Withdrawal<number>[];

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
};
