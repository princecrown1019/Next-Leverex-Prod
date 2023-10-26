import { toMilliseconds } from '~/services/DateFormat/dateFormatService';
import { Deposit } from '~/types/depositsTypes';
import { TransactionType } from '~/types/transactionTypes';

export const serializeDeposit = (deposit: Deposit<string>): Deposit<number> => ({
  ...deposit,
  type: TransactionType.DEPOSIT,
  amount: Number(deposit.outputs[0].amount),
  currency: deposit.outputs[0].currency,
  timestamp: toMilliseconds(deposit.timestamp)
});

export const serializeDeposits = (deposits: Deposit<string>[]) => {
  return deposits.map((deposit) => serializeDeposit(deposit));
};
