import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '~/store/types';
import { Product } from '~/types/productTypes';
import { selectDynamicProductLiveCutOffPrice } from '~/store/Market/selectors';
import { selectDynamicProductCutOffChange } from '~/store/Stats/selectors';
import { ProductsItemView } from '~/modules/Landing/views/ProductsItem/ProductsItemView';

type Props = {
  product: Product;
};

export const ProductsItemContainer: FC<Props> = ({ product }) => {
  const liveCutOffPrice = useSelector((state: AppState) => selectDynamicProductLiveCutOffPrice(state, product.type));
  const cutOffChange = useSelector((state: AppState) => selectDynamicProductCutOffChange(state, product.type));

  return <ProductsItemView product={product} liveCutOffPrice={liveCutOffPrice} cutOffChange={cutOffChange} />;
};
