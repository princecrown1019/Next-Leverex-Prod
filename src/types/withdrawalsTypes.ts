import { Currency } from '~/types/currencyTypes';
import { TransactionType } from '~/types/transactionTypes';

export enum WithdrawalStatus {
  FAILED,
  ACCEPTED,
  PENDING,
  BROADCASTED,
  COMPLETED,
  CANCELLED
}

export type Withdrawal<T> = {
  txId: string;
  nbConf: number;
  currency: Currency;
  amount: T;
  type: TransactionType.WITHDRAWAL;
  unblindedLink: string;
  timestamp: number;
  recvAddress: string;
  unconfAddress: string;
  id: string;
  requestId: string;
  status: WithdrawalStatus;
};

export enum WithdrawalsReference {
  DOWNLOAD = 'download'
}
