import React, { FC } from 'react';

import { CloseIcon } from '~/assets/Icons';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { LoadingComponent } from '~/components/Loading/LoadingComponent';

import style from './style.module.scss';

type Props = {
  label: string;
  address: string;
  loading: boolean;
  handleRemoveClick: (address: string, description?: string) => () => void;
};

export const AddressesItemComponent: FC<Props> = ({ label, address, loading, handleRemoveClick }) => (
  <div className={style.addressesItem}>
    <div className={style.addressesItemLeft}>
      <h6 className={style.addressesItemLabel}>{label}</h6>
      <span className={style.addressesItemAddress}>{address}</span>
    </div>

    <ButtonComponent
      className={style.addressesItemButton}
      disabled={loading}
      onClick={handleRemoveClick(address, label)}
    >
      {loading ? (
        <LoadingComponent className={style.addressesItemIcon} />
      ) : (
        <CloseIcon className={style.addressesItemIcon} />
      )}
    </ButtonComponent>
  </div>
);
