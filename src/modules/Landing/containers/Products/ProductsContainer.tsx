import React, { FC } from 'react';

import { supportedProducts } from '~/constants/productConstants';
import { ProductsItemContainer } from '~/modules/Landing/containers/ProductsItem/ProductsItemContainer';
import { LandingProductsView, Props as ViewProps } from '~/modules/Landing/views/Products/ProductsView';

type Props = Pick<ViewProps, 'className'>;

export const LandingProductsContainer: FC<Props> = ({ className }) => {
  return (
    <LandingProductsView className={className}>
      {supportedProducts.map((product) => (
        <ProductsItemContainer key={product.type} product={product} />
      ))}
    </LandingProductsView>
  );
};
