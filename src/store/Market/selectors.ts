import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '~/store/types';
import { Product, ProductSide, ProductType } from '~/types/productTypes';
import { DealerOffer } from '~/types/marketTypes';
import { fixDecimals } from '~/services/NumberFormat/numberFormatService';
import { products } from '~/constants/productConstants';
import { roundNumber } from '~/services/Number/nubmerServices';

const sortBuyOffers = (prev: DealerOffer<number>, curr: DealerOffer<number>) => curr.price - prev.price;
const sortSellOffers = (prev: DealerOffer<number>, curr: DealerOffer<number>) => prev.price - curr.price;

const getBestOffer = (
  offers: DealerOffer<number>[],
  amount: number,
  sortingCallback: (prev: DealerOffer<number>, curr: DealerOffer<number>) => number,
  useLatest = false
) => {
  const filtered = offers.filter((offer) => offer.volume >= amount);
  const bestVolume = Math.min(...filtered.map((offer) => offer.volume));
  const newFiltered = filtered.filter((offer) => offer.volume === bestVolume);

  const [best] = newFiltered.sort(sortingCallback);

  if (!best && useLatest) return offers.sort(sortingCallback)[0] || null;

  return best || null;
};

export const selectMarket = (state: AppState) => state.market;
export const selectMarketClosed = (state: AppState) => state.market.closed;
export const selectProductType = (state: AppState) => state.market.productType;
export const selectPrices = (state: AppState) => state.market.prices;
export const selectDealersOffers = (state: AppState) => state.market.dealersOffers;
export const selectDealersOffersLoading = (state: AppState) => state.market.loading.subscribeDealersOffers;
export const selectSessionHealthLoading = (state: AppState) => state.market.loading.sessionHealth;
export const selectSessionHealths = (state: AppState) => state.market.sessionHealths;

const selectLocalProduct = (_: AppState, productType: ProductType) => productType;
const selectSpreadPrice = (_: AppState, spread: number) => spread;
const selectAmount = (_: AppState, amount: number) => amount;
const selectAmountAndSide = (_: AppState, data: [ProductSide, number]) => data;

export const selectProduct = createSelector([selectProductType], (productType) => {
  return products.find(({ type }) => type === productType) as Product;
});

export const selectCurrentTypePrices = createSelector([selectPrices, selectProductType], (prices, productType) => {
  return prices[productType] || { ask: 0, bid: 0 };
});

export const selectCurrentProductLiveCutOffPrice = createSelector(
  [selectPrices, selectProductType],
  (prices, productType) => prices[productType]?.liveCutOffPrice || 0
);

export const selectDynamicProductLiveCutOffPrice = createSelector(
  [selectPrices, selectLocalProduct],
  (prices, localProductType) => prices[localProductType]?.liveCutOffPrice || 0
);

export const selectAllDealersOffers = createSelector(
  [selectDealersOffers, selectCurrentProductLiveCutOffPrice],
  (offers, livePrice) => {
    return offers.map((offer) => {
      const diff = offer.side === ProductSide.BUY ? offer.price - livePrice : livePrice - offer.price;
      const diffPercentage = Number.isNaN(diff) ? 0 : Number(fixDecimals((diff / livePrice) * 100, 2));

      return { ...offer, clientDiff: diff, clientDiffPercentage: diffPercentage };
    });
  }
);

export const selectBuyDealersOffers = createSelector([selectAllDealersOffers], (offers) => {
  return offers.filter((item) => item.side === ProductSide.BUY).sort(sortBuyOffers);
});

export const selectSellDealersOffers = createSelector([selectAllDealersOffers], (offers) => {
  return offers.filter((item) => item.side === ProductSide.SELL).sort(sortSellOffers);
});

export const selectBestDealerOfferId = createSelector(
  [selectBuyDealersOffers, selectSellDealersOffers, selectAmountAndSide],
  (offersBuy, offersSell, [side, amount]) => {
    if (!amount) return null;

    return side === ProductSide.SELL
      ? getBestOffer(offersBuy, amount, sortBuyOffers)?.id || null
      : getBestOffer(offersSell, amount, sortSellOffers)?.id || null;
  }
);

export const selectMarketPrices = createSelector(
  [selectBuyDealersOffers, selectSellDealersOffers, selectCurrentTypePrices, selectAmount],
  (offersBuy, offersSell, prices, amount) => {
    if (!amount) return prices;

    const bid = getBestOffer(offersBuy, amount, sortBuyOffers, true)?.price || 0;
    const ask = getBestOffer(offersSell, amount, sortSellOffers, true)?.price || 0;

    return { bid, ask };
  }
);

export const selectBestDealerOffers = createSelector(
  [selectBuyDealersOffers, selectSellDealersOffers, selectCurrentTypePrices, selectAmount],
  (offersBuy, offersSell, prices, amount) => {
    if (!amount) return { bid: null, ask: null };

    const bid = getBestOffer(offersBuy, amount, sortBuyOffers);
    const ask = getBestOffer(offersSell, amount, sortSellOffers);

    return { bid, ask };
  }
);

export const selectMarketPriceExists = createSelector(
  [selectBuyDealersOffers, selectSellDealersOffers, selectAmountAndSide],
  (offersBuy, offersSell, [side, amount]) => {
    if (!amount) return true;

    return !!(side === ProductSide.SELL
      ? getBestOffer(offersBuy, amount, sortBuyOffers)?.price
      : getBestOffer(offersSell, amount, sortSellOffers)?.price);
  }
);

export const selectBuyDealersOffersWithSpreadPrice = createSelector(
  [selectBuyDealersOffers, selectSpreadPrice],
  (offers, spread) => {
    return offers.map((offer) => ({ ...offer, price: roundNumber(offer.price, spread, true) }));
  }
);

export const selectSellDealersOffersWithSpreadPrice = createSelector(
  [selectSellDealersOffers, selectSpreadPrice],
  (offers, spread) => {
    return offers.map((offer) => ({ ...offer, price: roundNumber(offer.price, spread, false) }));
  }
);

export const selectBestBuyDealerOfferGroupedByPrice = createSelector([selectBestDealerOffers], ({ bid }) => {
  if (!bid) return null;

  return { ...bid, price: roundNumber(bid.price, 25, true) };
});

export const selectBestSellDealerOfferGroupedByPrice = createSelector([selectBestDealerOffers], ({ ask }) => {
  if (!ask) return null;

  return { ...ask, price: roundNumber(ask.price, 25, false) };
});

export const selectDynamicSessionHealth = createSelector(
  [selectSessionHealths, selectLocalProduct],
  (healths, product) => healths[product]
);

export const selectCurrentSessionHealth = createSelector(
  [selectSessionHealths, selectProductType],
  (healths, product) => healths[product] || null
);
