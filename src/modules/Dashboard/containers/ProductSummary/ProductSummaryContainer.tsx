import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectProduct } from '~/store/Market/selectors';
import {
  ProductTransactionsSummaryView,
  Props as ViewProps
} from '~/modules/Dashboard/views/ProductSummary/ProductSummaryView';

type Props = Pick<ViewProps, 'className'>;

export const DashboardProductSummaryContainer: FC<Props> = ({ className }) => {
  const product = useSelector(selectProduct);

  return <ProductTransactionsSummaryView className={className} product={product} />;
};
