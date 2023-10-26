import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentProductLiveCutOffPrice } from '~/store/Market/selectors';
import { OverviewStreamsIndexPriceView } from '~/modules/Overview/views/IndexPrice/IndexPriceView';

export const StreamsIndexPriceContainer = () => {
  const liveCutOffPrice = useSelector(selectCurrentProductLiveCutOffPrice);

  return <OverviewStreamsIndexPriceView liveCutOffPrice={liveCutOffPrice} />;
};
