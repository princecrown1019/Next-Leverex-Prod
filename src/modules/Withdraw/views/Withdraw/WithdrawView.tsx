import React, { ChangeEvent, FC, FormEvent, RefObject, useMemo } from 'react';

import clsx from 'clsx';

import { ProductType } from '~/types/productTypes';
import { Address } from '~/types/addressTypes';
import { Network } from '~/types/networkTypes';
import { Currency } from '~/types/currencyTypes';
import { separateAndFix } from '~/services/NumberFormat/numberFormatService';
import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';
import { NetworkDropdownComponent } from '~/components/NetworkDropdown/NetworkDropdownComponent';
import { ProductDropdownComponent } from '~/components/ProductDropdown/ProductDropdownComponent';
import { InputMaskComponent } from '~/components/InputMask/InputMaskComponent';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { AddressDropdownComponent } from '~/modules/Withdraw/components/AddressDropdown/AddressDropdownComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  ccy: Currency;
  amount: string;
  amountError: boolean;
  numericAmount: number;
  address: null | Address;
  amountInputRef: RefObject<HTMLInputElement>;
  addressOptions: Address[];
  buyingPower: number;
  product: ProductType;
  network: Network;
  loading: boolean;
  disabled: boolean;
  handleAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleProductChange: (value: ProductType) => void;
  handleAddressChange: (value: Address) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const WithdrawView: FC<Props> = ({
  className,
  ccy,
  amount,
  numericAmount,
  amountError,
  amountInputRef,
  address,
  addressOptions,
  buyingPower,
  product,
  network,
  loading,
  disabled,
  handleProductChange,
  handleAmountChange,
  handleAddressChange,
  handleSubmit
}) => {
  const amountEndAdornment = useMemo(() => <span className={style.withdrawInputAmountEndAdornment}>{ccy}</span>, [ccy]);

  return (
    <div className={clsx(style.withdraw, className)}>
      <span className={style.withdrawBalance}>
        Available Balance:&nbsp;
        <strong>
          <ValueComponent>{buyingPower}</ValueComponent>&nbsp;
          {ccy}
        </strong>
      </span>

      <form className={style.withdrawForm} onSubmit={handleSubmit}>
        <div className={style.withdrawColumn}>
          <NetworkDropdownComponent className={style.withdrawInput} value={network} />
          <ProductDropdownComponent
            className={style.withdrawInput}
            value={product}
            handleChange={handleProductChange}
          />
          <ActionButtonComponent className={style.withdrawButton} loading={loading} disabled={disabled} type="submit">
            Withdraw
          </ActionButtonComponent>
        </div>

        <div className={style.withdrawColumn}>
          <InputMaskComponent
            className={style.withdrawInput}
            label="Amount"
            error={amountError}
            value={amount}
            autoFocus
            ref={amountInputRef}
            endAdornment={amountEndAdornment}
            maskValue={separateAndFix(numericAmount, 2)}
            onChange={handleAmountChange}
          />
          <AddressDropdownComponent
            className={style.withdrawInput}
            options={addressOptions}
            value={address}
            handleChange={handleAddressChange}
          />
        </div>
      </form>
    </div>
  );
};
