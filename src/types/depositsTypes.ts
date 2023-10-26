import { Currency } from '~/types/currencyTypes';
import { TransactionType } from '~/types/transactionTypes';

type DepositOutput = {
  amount: string;
  currency: Currency;
};

export type Deposit<T> = {
  txId: string;
  nbConf: number;
  currency: Currency;
  amount: T;
  type: TransactionType.DEPOSIT;
  unblindedLink: string;
  timestamp: number;
  recvAddress: string;
  unconfAddress: string;
  outputs: DepositOutput[];
};

export enum DepositsReference {
  DOWNLOAD = 'download'
}
