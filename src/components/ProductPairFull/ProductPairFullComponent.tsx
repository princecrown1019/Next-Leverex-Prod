import React, { FC } from 'react';

import { Product } from '~/types/productTypes';
import { toFullProductPair } from '~/services/Product/productService';

type Props = {
  ticker: Product['ticker'];
  currency: Product['currency'];
};

export const ProductPairFullComponent: FC<Props> = ({ currency, ticker }) => <>{toFullProductPair(ticker, currency)}</>;
