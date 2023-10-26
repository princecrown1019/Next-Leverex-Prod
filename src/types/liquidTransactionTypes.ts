import { Withdrawal } from '~/types/withdrawalsTypes';
import { Deposit } from '~/types/depositsTypes';

export type LiquidTransaction<T> = Withdrawal<T> | Deposit<T>;
