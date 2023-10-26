import { DealerOffer, MarketPrice } from '~/types/marketTypes';

import { UpdatePricesRes } from './types';

export const serializeMarketPrice = (payload: UpdatePricesRes): MarketPrice<number> => ({
  ask: Number(payload.ask),
  bid: Number(payload.bid),
  liveCutOffPrice: Number(payload.liveCutoff)
});

export const serializeDealerOffer = (offer: DealerOffer<string>): DealerOffer<number> => ({
  ...offer,
  price: Number(offer.price),
  volume: Number(offer.volume)
});

export const serializeDealersOffers = (offers: DealerOffer<string>[]): DealerOffer<number>[] => {
  return offers.map((offer) => serializeDealerOffer(offer));
};
