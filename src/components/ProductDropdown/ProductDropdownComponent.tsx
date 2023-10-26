import React, { FC, useCallback, useMemo } from 'react';

import clsx from 'clsx';

import { PRODUCT_FULL_NAMES, PRODUCT_ICONS } from '~/constants/productConstants';
import { PRICE_CURRENCIES } from '~/constants/currencyConstants';
import { ProductType } from '~/types/productTypes';
import { DropdownComponent, Props as DropdownProps } from '~/components/Dropdown/DropdownComponent';
import { LockIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = Omit<
  DropdownProps<ProductType>,
  'renderSelected' | 'renderOption' | 'optionKey' | 'optionDisabled' | 'options'
>;

const options = Object.values(ProductType);

export const ProductDropdownComponent: FC<Props> = (props) => {
  const endAdornment = useMemo(() => <LockIcon />, []);

  const renderOption = useCallback(
    (selected?: boolean) => (value: null | ProductType) => {
      if (!value) return null;

      const Icon = PRODUCT_ICONS[value];
      const name = PRICE_CURRENCIES[value];
      const fullName = PRODUCT_FULL_NAMES[value];

      return (
        <div className={style.productDropdownOption}>
          <Icon className={clsx(selected ? style.productDropdownIconSelected : style.productDropdownIconOption)} />
          <span className={style.productDropdownOptionFullName}>
            <span className={style.productDropdownOptionName}>{name}</span>
            {fullName}
          </span>
        </div>
      );
    },
    []
  );

  const optionKey = useCallback((option: ProductType) => option, []);
  const optionDisabled = useCallback((option: ProductType) => option === ProductType.BTC_EURX, []);

  return (
    <DropdownComponent
      {...props}
      disabled
      label="Currency"
      options={options}
      renderSelected={renderOption(true)}
      renderOption={renderOption()}
      optionKey={optionKey}
      endAdornment={endAdornment}
      optionDisabled={optionDisabled}
    />
  );
};
