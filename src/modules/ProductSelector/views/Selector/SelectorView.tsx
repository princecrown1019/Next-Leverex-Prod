import React, { memo, MouseEvent } from 'react';

import clsx from 'clsx';

import { Product } from '~/types/productTypes';
import { ProductSelectorItemComponent } from '~/modules/ProductSelector/components/SelectorItem/SelectorItemComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { DropdownArrowComponent } from '~/components/DropdownArrow/DropdownArrowComponent';

import style from './style.module.scss';

export type Props = {
  selectedProduct: Product;
  open: boolean;
  disabled: boolean;
  products: Product[];
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleOutsideClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleProductClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ProductSelectorView = memo<Props>(
  ({ selectedProduct, open, disabled, products, handleProductClick, handleClick }) => {
    return (
      <div className={style.productSelectorContainer}>
        <div className={clsx(style.productSelector, open && style.productSelectorOpen)}>
          <ButtonComponent
            className={style.productSelectorButton}
            disabled={disabled}
            withoutRipple
            onClick={handleClick}
          >
            <ProductSelectorItemComponent product={selectedProduct} />

            {!!products.length && (
              <div className={style.productSelectorButtonEnd}>
                <span className={style.productSelectorButtonEndText}>{open ? 'Hide' : 'All markets'}</span>
                <DropdownArrowComponent open={open} />
              </div>
            )}
          </ButtonComponent>

          {open ? (
            <div className={style.productSelectorList}>
              {products.map((product) => (
                <ProductSelectorItemComponent
                  className={style.productSelectorItemButton}
                  product={product}
                  key={product.type}
                  disabled={product.disabled}
                  handleClick={handleProductClick}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
