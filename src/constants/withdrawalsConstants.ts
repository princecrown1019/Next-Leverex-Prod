import { WithdrawalStatus } from '~/types/withdrawalsTypes';

export const WITHDRAWAL_STATUSES = {
  [WithdrawalStatus.ACCEPTED]: 'Accepted',
  [WithdrawalStatus.PENDING]: 'Pending',
  [WithdrawalStatus.FAILED]: 'Failed',
  [WithdrawalStatus.BROADCASTED]: 'Broadcasted',
  [WithdrawalStatus.COMPLETED]: 'Completed',
  [WithdrawalStatus.CANCELLED]: 'Cancelled'
};
