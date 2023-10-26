import { TransactionType } from '~/types/transactionTypes';
import { toMilliseconds } from '~/services/DateFormat/dateFormatService';
import { Withdrawal } from '~/types/withdrawalsTypes';

export const serializeWithdrawal = (withdrawal: Withdrawal<string>): Withdrawal<number> => ({
  ...withdrawal,
  type: TransactionType.WITHDRAWAL,
  amount: -Number(withdrawal.amount),
  timestamp: toMilliseconds(withdrawal.timestamp)
});

export const serializeWithdrawals = (withdrawals: Withdrawal<string>[]) => {
  return withdrawals.map((withdrawal) => serializeWithdrawal(withdrawal));
};
