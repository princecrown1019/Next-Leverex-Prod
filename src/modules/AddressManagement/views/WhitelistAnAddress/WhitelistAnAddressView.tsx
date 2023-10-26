import React, { ChangeEvent, FC, FormEvent, KeyboardEvent } from 'react';

import clsx from 'clsx';

import { ProductType } from '~/types/productTypes';
import { Network } from '~/types/networkTypes';
import { InputComponent } from '~/components/Input/InputComponent';
import { TextareaComponent } from '~/components/Textarea/TextareaComponent';
import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';
import { NetworkDropdownComponent } from '~/components/NetworkDropdown/NetworkDropdownComponent';
import { ProductDropdownComponent } from '~/components/ProductDropdown/ProductDropdownComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  label: string;
  address: string;
  product: ProductType;
  network: Network;
  loading: boolean;
  disabled: boolean;
  handleLabelChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddressChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleProductChange: (value: ProductType) => void;
  handleAddressPaste: (value: string) => void;
  handleAddressKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const WhitelistAnAddressView: FC<Props> = ({
  className,
  label,
  address,
  product,
  loading,
  disabled,
  network,
  handleLabelChange,
  handleAddressChange,
  handleProductChange,
  handleAddressPaste,
  handleAddressKeyDown,
  handleSubmit
}) => {
  return (
    <form className={clsx(style.whitelistAddress, className)} onSubmit={handleSubmit}>
      <div className={style.whitelistAddressColumn}>
        <NetworkDropdownComponent className={style.whitelistInput} value={network} />
        <ProductDropdownComponent className={style.whitelistInput} value={product} handleChange={handleProductChange} />
      </div>

      <div className={style.whitelistAddressColumn}>
        <InputComponent className={style.whitelistInput} label="Label" value={label} onChange={handleLabelChange} />
        <TextareaComponent
          className={style.whitelistInput}
          label="Address"
          rows={4}
          autoFocus
          value={address}
          onKeyDown={handleAddressKeyDown}
          onChange={handleAddressChange}
          onPasteClick={handleAddressPaste}
        />
        <ActionButtonComponent
          className={style.whitelistAddressButton}
          loading={loading}
          disabled={disabled}
          type="submit"
        >
          Save
        </ActionButtonComponent>
      </div>
    </form>
  );
};
