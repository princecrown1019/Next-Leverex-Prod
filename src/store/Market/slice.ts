import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductType } from '~/types/productTypes';

import {
  CommonReq,
  LoadSessionHealthRes,
  MarketState,
  SubscribeDealersOffersRes,
  SubscribePricesRes,
  UnsubscribeDealersOffersRes,
  UnsubscribePricesRes,
  UpdateDealersOffersRes,
  UpdatePricesRes
} from './types';
import { serializeDealerOffer, serializeMarketPrice } from './serializer';
import {
  loadSessionHealth,
  loadSessionHealthRequest,
  subscribeDealersOffers,
  subscribeDealersOffersRequest,
  subscribePrices,
  subscribePricesRequest,
  unsubscribeDealersOffers,
  unsubscribeDealersOffersRequest,
  unsubscribePrices,
  unsubscribePricesRequest
} from './actions';

export const initialState: MarketState = {
  productType: ProductType.BTC_USDT,
  closed: true,
  dealersOffers: [],
  prices: {},
  sessionHealths: {},

  loading: {
    subscribePrices: false,
    unsubscribePrices: false,
    subscribeDealersOffers: false,
    unsubscribeDealersOffers: false,
    sessionHealth: false
  },

  error: {
    subscribePrices: null,
    unsubscribePrices: null,
    subscribeDealersOffers: null,
    unsubscribeDealersOffers: null,
    sessionHealth: null
  }
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    subscribePricesFulfilled: (state, _: PayloadAction<SubscribePricesRes>) => {
      state.loading.subscribePrices = false;
    },

    subscribePricesRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.subscribePrices = false;
      state.error.subscribePrices = payload;
    },

    unsubscribePricesFulfilled: (state, _: PayloadAction<UnsubscribePricesRes>) => {
      state.loading.unsubscribePrices = false;
    },

    unsubscribePricesRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.unsubscribePrices = false;
      state.error.unsubscribePrices = payload;
    },

    subscribeDealersOffersFulfilled: (state, _: PayloadAction<SubscribeDealersOffersRes>) => {
      state.loading.subscribeDealersOffers = false;
    },

    subscribeDealersOffersRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.subscribeDealersOffers = false;
      state.error.subscribeDealersOffers = payload;
    },

    unsubscribeDealersOffersFulfilled: (state, _: PayloadAction<UnsubscribeDealersOffersRes>) => {
      state.loading.unsubscribeDealersOffers = false;
      state.dealersOffers = [];
    },

    unsubscribeDealersOffersRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.unsubscribeDealersOffers = false;
      state.error.unsubscribeDealersOffers = payload;
    },

    loadSessionHealthFulfilled: (state, { payload }: PayloadAction<LoadSessionHealthRes>) => {
      state.loading.sessionHealth = false;
      Object.assign(state.sessionHealths, { [payload.productType]: payload.healthy });
    },

    loadSessionHealthRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.sessionHealth = false;
      state.error.sessionHealth = payload;
    },

    updatePrices: (state, { payload }: PayloadAction<UpdatePricesRes>) => {
      state.prices[payload.productType] = serializeMarketPrice(payload);
    },

    updateDealersOffers: (state, { payload }: PayloadAction<UpdateDealersOffersRes>) => {
      const newOffers = [];

      for (const offer of payload.offers) {
        if (offer.command) newOffers.push(serializeDealerOffer(offer));
      }

      state.dealersOffers = [...newOffers];
    },

    changeProduct: (state, { payload }: PayloadAction<CommonReq>) => {
      state.productType = payload.productType;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(subscribePricesRequest.type, (state) => {
      state.loading.subscribePrices = true;
      state.error.subscribePrices = null;
    });

    builder.addCase(unsubscribePricesRequest.type, (state) => {
      state.loading.unsubscribePrices = true;
      state.error.unsubscribePrices = null;
    });

    builder.addCase(subscribeDealersOffersRequest.type, (state) => {
      state.loading.subscribeDealersOffers = true;
      state.error.subscribeDealersOffers = null;
    });

    builder.addCase(unsubscribeDealersOffersRequest.type, (state) => {
      state.loading.unsubscribeDealersOffers = true;
      state.error.unsubscribeDealersOffers = null;
    });

    builder.addCase(loadSessionHealthRequest.type, (state) => {
      state.loading.sessionHealth = true;
      state.error.sessionHealth = null;
    });
  }
});

export const marketReducer = marketSlice.reducer;
export const marketActions = {
  ...marketSlice.actions,
  subscribePrices,
  unsubscribePrices,
  subscribeDealersOffers,
  unsubscribeDealersOffers,
  loadSessionHealth
};
