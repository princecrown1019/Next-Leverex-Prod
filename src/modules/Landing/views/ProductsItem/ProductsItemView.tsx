import React, { FC } from 'react';

import clsx from 'clsx';

import { Product } from '~/types/productTypes';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { TextGradientComponent } from '~/components/TextGradient/TextGradientComponent';
import { ProductPairFullComponent } from '~/components/ProductPairFull/ProductPairFullComponent';
import { ProductPairComponent } from '~/components/ProductPair/ProductPairComponent';
import { CurrencySymbolComponent } from '~/components/CurrencySymbol/CurrencySymbolComponent';

import style from './style.module.scss';

type Props = {
  product: Product;
  liveCutOffPrice: number;
  cutOffChange: number;
};

export const ProductsItemView: FC<Props> = ({ cutOffChange, liveCutOffPrice, product }) => (
  <li className={clsx(style.productsItem, product.disabled && style.productsItemComingSoon)}>
    <product.Icon className={style.productsItemIcon} />

    <div className={style.productsItemContent}>
      <div className={style.productsItemRow}>
        <h5 className={style.productsItemName}>
          <ProductPairFullComponent ticker={product.ticker} currency={product.currency} />
        </h5>
        {product.disabled ? null : (
          <TextGradientComponent
            className={style.productsItemChange}
            positive={cutOffChange > 0}
            visible={!!cutOffChange}
          >
            <ValueComponent after="%">{cutOffChange}</ValueComponent>
          </TextGradientComponent>
        )}
      </div>

      <div className={style.productsItemRow}>
        <h6 className={style.productsItemTicker}>
          <ProductPairComponent ticker={product.ticker} currency={product.currency} />
        </h6>
        {product.disabled ? (
          <span className={style.productsItemPrice}>Coming Soon</span>
        ) : (
          <span className={style.productsItemPrice}>
            <ValueComponent before={<CurrencySymbolComponent currency={product.currency} />}>
              {liveCutOffPrice}
            </ValueComponent>
          </span>
        )}
      </div>
    </div>
  </li>
);
