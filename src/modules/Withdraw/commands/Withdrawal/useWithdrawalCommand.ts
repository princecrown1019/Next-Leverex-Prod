import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Currency } from '~/types/currencyTypes';
import { withdrawalsActions } from '~/store/Withdrawals/slice';

export const useWithdrawalCommand = () => {
  const dispatch = useDispatch();

  return useCallback((address: string, amount: number, currency: Currency) => {
    dispatch(withdrawalsActions.withdraw({ amount, address, currency }));
  }, []);
};
