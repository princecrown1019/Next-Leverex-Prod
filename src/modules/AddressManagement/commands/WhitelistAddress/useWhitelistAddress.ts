import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { addressesActions } from '~/store/Addresses/slice';

export const useWhitelistAddress = () => {
  const dispatch = useDispatch();

  return useCallback((address: string, label?: string) => {
    dispatch(addressesActions.whitelistAddress({ description: label, address }));
  }, []);
};
