import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Address } from '~/types/addressTypes';
import { selectRemoveAddressLoading } from '~/store/Addresses/selectors';
import { addressesActions } from '~/store/Addresses/slice';

export const useRemoveWhitelistedAddress = () => {
  const dispatch = useDispatch();

  const [removingAddress, setRemovingAddress] = useState<null | Omit<Address, 'timestamp'>>(null);

  const loading = useSelector(selectRemoveAddressLoading);

  useEffect(() => {
    if (loading || !removingAddress) return;

    setRemovingAddress(null);
  }, [loading]);

  const remove = useCallback(
    (address: string) => {
      if (loading) return;

      dispatch(addressesActions.removeAddress({ address }));
    },
    [loading]
  );

  return { remove, removingAddress, setRemovingAddress };
};
