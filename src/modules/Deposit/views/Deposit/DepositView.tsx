import React, { FC, MouseEvent, useMemo } from 'react';

import clsx from 'clsx';

import { ProductType } from '~/types/productTypes';
import { Network } from '~/types/networkTypes';
import { NetworkDropdownComponent } from '~/components/NetworkDropdown/NetworkDropdownComponent';
import { ProductDropdownComponent } from '~/components/ProductDropdown/ProductDropdownComponent';
import { TextareaComponent } from '~/components/Textarea/TextareaComponent';
import { SummaryRowComponent } from '~/components/SummaryRow/SummaryRowComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { AddressQrTooltipComponent } from '~/modules/Deposit/components/AddressQrTooltip/AddressQrTooltipComponent';
import { CopyIcon, QrIcon } from '~/assets/Icons';

import style from './style.module.scss';

export type Props = {
  className?: string;
  product: ProductType;
  depositAddress: null | string;
  network: Network;
  handleCopyClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleProductChange: (value: ProductType) => void;
};

export const DepositView: FC<Props> = ({
  className,
  depositAddress,
  product,
  network,
  handleCopyClick,
  handleProductChange
}) => {
  const depositAddressEndAdornment = useMemo(
    () =>
      depositAddress ? (
        <div className={style.depositInputAddressEndAdornment}>
          <ButtonComponent className={style.depositInputAddressEndAdornmentButton} disabled>
            <CopyIcon />
          </ButtonComponent>
          <AddressQrTooltipComponent depositAddress={depositAddress}>
            <ButtonComponent
              className={clsx(style.depositInputAddressEndAdornmentButton, style.depositInputButtonQr)}
              disabled
            >
              <QrIcon />
            </ButtonComponent>
          </AddressQrTooltipComponent>
        </div>
      ) : null,
    [depositAddress]
  );

  return (
    <div className={clsx(style.deposit, className)}>
      <div className={style.depositColumn}>
        <NetworkDropdownComponent className={style.depositInput} value={network} />
        <ProductDropdownComponent className={style.depositInput} value={product} handleChange={handleProductChange} />

        <div className={style.depositInputDetails}>
          <SummaryRowComponent label="Credit time">2 network confirmations</SummaryRowComponent>
          <SummaryRowComponent label="Deposit Fee">Free</SummaryRowComponent>
        </div>
      </div>

      <div className={style.depositColumn}>
        <ButtonComponent className={style.depositAddressButton} onClick={handleCopyClick}>
          <TextareaComponent
            className={style.depositInput}
            label="Your deposit address"
            staticLabel
            disabled
            endAdornment={depositAddressEndAdornment}
            value={depositAddress || '-'}
            rows={4}
            onChange={() => {}}
          />
        </ButtonComponent>
      </div>
    </div>
  );
};
