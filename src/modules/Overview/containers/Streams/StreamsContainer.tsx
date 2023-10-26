import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '~/store/types';
import {
  selectBestDealerOfferId,
  selectBuyDealersOffers,
  selectDealersOffersLoading,
  selectSellDealersOffers
} from '~/store/Market/selectors';
import { useMarketContext } from '~/modules/Trade/contexts/Market/MarketContext';
import { useMaxTradeAmountCommand } from '~/modules/Overview/commands/MaxTradeAmount/useMaxTradeAmountCommand';
import { StreamsView } from '~/modules/Overview/views/Streams/StreamsView';

export const StreamsContainer = () => {
  const { amount, side } = useMarketContext();

  const loading = useSelector(selectDealersOffersLoading);
  const offersBuy = useSelector(selectBuyDealersOffers);
  const offersSell = useSelector(selectSellDealersOffers);
  const bestOfferId = useSelector((state: AppState) => selectBestDealerOfferId(state, [side, amount.amount]));

  useMaxTradeAmountCommand(!!offersBuy.length && !!offersSell.length);

  return <StreamsView bestId={bestOfferId} loading={loading} offersBuy={offersBuy} offersSell={offersSell} />;
};
