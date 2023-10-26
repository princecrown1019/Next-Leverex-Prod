import React, { FC, FormEvent, ChangeEvent, KeyboardEvent, useCallback, useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { AccountPath } from '~/constants/pathsConstants';
import { Network } from '~/types/networkTypes';
import { ProductType } from '~/types/productTypes';
import {
  selectAddressesLoading,
  selectWhitelistAddressError,
  selectWhitelistAddressLoading,
  selectWhitelistedAddresses
} from '~/store/Addresses/selectors';
import { useWhitelistAddress } from '~/modules/AddressManagement/commands/WhitelistAddress/useWhitelistAddress';
import {
  Props as ViewProps,
  WhitelistAnAddressView
} from '~/modules/AddressManagement/views/WhitelistAnAddress/WhitelistAnAddressView';
import { useLoadWhitelistedAddresses } from '~/modules/AddressManagement/commands/LoadWhitelistedAddresses/useLoadWhitelistedAddresses';

type Props = Pick<ViewProps, 'className'>;

const initialState = {
  label: '',
  address: ''
};

export const WhitelistAnAddressContainer: FC<Props> = ({ className }) => {
  const { push } = useRouter();

  const loading = useSelector(selectWhitelistAddressLoading);
  const error = useSelector(selectWhitelistAddressError);
  const addresses = useSelector(selectWhitelistedAddresses);
  const addressesLoading = useSelector(selectAddressesLoading);

  const [product, setProduct] = useState(ProductType.BTC_USDT);
  const [state, setState] = useState(initialState);

  useLoadWhitelistedAddresses(!!addresses.length);
  const whitelistAddress = useWhitelistAddress();

  useEffect(() => {
    if (loading || error || !state.address) return;

    push(AccountPath.ADDRESS_MANAGEMENT);
  }, [loading]);

  useEffect(() => {
    if (addressesLoading || addresses.length < 3) return;

    push(AccountPath.ADDRESS_MANAGEMENT);
  }, [addressesLoading, addresses.length]);

  const disabled = useMemo(() => {
    return !state.label || !state.address || addresses.length > 2;
  }, [state.label, state.address, addresses.length]);

  const handleProductChange = useCallback((productType: ProductType) => {
    setProduct(productType);
  }, []);

  const handleLabelChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, label: currentTarget.value }));
  }, []);

  const handleAddressChange = useCallback(({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({ ...prevState, address: currentTarget.value.trim() }));
  }, []);

  const handleAddressPaste = useCallback((address: string) => {
    setState((prevState) => ({ ...prevState, address: address.trim() }));
  }, []);

  const handleSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      if (loading || disabled) return;

      whitelistAddress(state.address, state.label);
    },
    [loading, disabled, state.address, state.label]
  );

  const handleAddressKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.code !== 'Enter' || event.shiftKey) return;
      event.preventDefault();

      handleSubmit();
    },
    [handleSubmit]
  );

  return (
    <WhitelistAnAddressView
      className={className}
      address={state.address}
      label={state.label}
      disabled={disabled}
      loading={loading}
      product={product}
      network={Network.LIQUID}
      handleSubmit={handleSubmit}
      handleAddressKeyDown={handleAddressKeyDown}
      handleLabelChange={handleLabelChange}
      handleAddressChange={handleAddressChange}
      handleAddressPaste={handleAddressPaste}
      handleProductChange={handleProductChange}
    />
  );
};
