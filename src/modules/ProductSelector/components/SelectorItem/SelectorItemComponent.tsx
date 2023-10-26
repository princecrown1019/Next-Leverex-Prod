import React, { memo, MouseEvent } from 'react';

import clsx from 'clsx';

import { Product } from '~/types/productTypes';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { ProductPairComponent } from '~/components/ProductPair/ProductPairComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  product: Product;
  disabled?: boolean;
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ProductSelectorItemComponent = memo<Props>(({ className, product, disabled, handleClick }) => (
  <ButtonComponent
    className={clsx(style.productSelectorItem, className)}
    disabled={disabled}
    name={product.type}
    onClick={disabled ? undefined : handleClick}
    withoutRipple
  >
    <product.Icon className={style.productSelectorItemIcon} />
    <ProductPairComponent ticker={product.ticker} currency={product.currency} />
  </ButtonComponent>
));
