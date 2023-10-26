import React, { FC } from 'react';

import clsx from 'clsx';

import { Address } from '~/types/addressTypes';
import { AddressesItemComponent } from '~/modules/AddressManagement/components/AddressesItem/AddressesItemComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  addresses: Address[];
  loading: boolean;
  removingAddress?: null | string;
  handleRemoveClick: (address: string, description?: string) => () => void;
};

export const WhitelistedAddressesView: FC<Props> = ({
  className,
  removingAddress,
  loading,
  addresses,
  handleRemoveClick
}) => (
  <div className={clsx(className, !!addresses.length && style.whitelistedAddresses)}>
    {addresses.length ? (
      addresses.map(({ address, description }, idx) => (
        <AddressesItemComponent
          key={address}
          label={description || `Address ${idx + 1}`}
          address={address}
          loading={loading && removingAddress === address}
          handleRemoveClick={handleRemoveClick}
        />
      ))
    ) : (
      <p className={style.whitelistedAddressesMessage}>
        You have no whitelisted addresses yet. You will need to first whitelist an address in order to enable Stablecoin
        deposits and withdrawals. You may have up to three whitelisted addresses.
      </p>
    )}
  </div>
);
