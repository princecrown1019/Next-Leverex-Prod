import React, { FC } from 'react';

import { Product } from '~/types/productTypes';
import { toProductPair } from '~/services/Product/productService';

type Props = {
  ticker: Product['ticker'];
  currency: Product['currency'];
};

export const ProductPairComponent: FC<Props> = ({ currency, ticker }) => <>{toProductPair(ticker, currency)}</>;
