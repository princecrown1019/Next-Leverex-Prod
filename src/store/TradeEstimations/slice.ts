import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  LoadEstimationRes,
  LoadMaxAmountRes,
  LoadMaxAmountSocketReq,
  LoadProductFeeRes,
  TradeEstimationsState
} from './types';
import { serializeImEstimation, serializeMaxTradeAmount, serializeProductFee } from './serializer';
import {
  loadImEstimation,
  loadImEstimationRequest,
  loadMaxTradeAmount,
  loadMaxTradeAmountRequest,
  loadProductFee,
  loadProductFeeRequest
} from './actions';

export const initialState: TradeEstimationsState = {
  maxTradeAmount: {},
  productFee: null,
  imEstimation: null,

  loading: {
    maxTradeAmount: false,
    productFee: false,
    imEstimation: false
  },

  error: {
    maxTradeAmount: null,
    productFee: null,
    imEstimation: null
  }
};

const tradeEstimationsSlice = createSlice({
  name: 'tradeEstimations',
  initialState,
  reducers: {
    loadImEstimationFulfilled: (state, { payload }: PayloadAction<LoadEstimationRes>) => {
      if (!state.loading.imEstimation) return;

      state.imEstimation = serializeImEstimation(payload);
      state.loading.imEstimation = false;
    },

    loadImEstimationRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.imEstimation = false;
      state.error.imEstimation = payload;
    },

    loadMaxTradeAmountFulfilled: (state, { payload }: PayloadAction<LoadMaxAmountRes>) => {
      state.loading.maxTradeAmount = false;

      if (!state.maxTradeAmount[payload.productType]) {
        state.maxTradeAmount[payload.productType] = {};
      }

      state.maxTradeAmount[payload.productType]![payload.side] = serializeMaxTradeAmount(payload);
      state.maxTradeAmount[payload.productType]!.lastUpdateAt = Date.now();
    },

    loadMaxTradeAmountRejected: (state, { payload }: PayloadAction<LoadMaxAmountRes>) => {
      state.loading.maxTradeAmount = false;

      if (!state.error.maxTradeAmount) {
        state.error.maxTradeAmount = {};
      }

      state.error.maxTradeAmount[payload.side] = payload.errorMsg;
    },

    loadProductFeeFulfilled: (state, { payload }: PayloadAction<LoadProductFeeRes>) => {
      state.loading.productFee = false;
      state.productFee = serializeProductFee(payload);
    },

    loadProductFeeRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.productFee = false;
      state.error.productFee = payload;
    },

    resetImEstimation: (state) => {
      state.imEstimation = null;
      state.loading.imEstimation = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadImEstimationRequest.type, (state) => {
      state.loading.imEstimation = true;
      state.error.imEstimation = null;
    });

    builder.addCase(loadMaxTradeAmountRequest.type, (state, { payload }: PayloadAction<LoadMaxAmountSocketReq>) => {
      state.loading.maxTradeAmount = true;

      if (state.error.maxTradeAmount) {
        state.error.maxTradeAmount[payload.maxTradeAmount.side] = null;
      }
    });

    builder.addCase(loadProductFeeRequest.type, (state) => {
      state.loading.productFee = true;
      state.error.productFee = null;
    });
  }
});

export const tradeEstimationsReducer = tradeEstimationsSlice.reducer;
export const tradeEstimationsActions = {
  ...tradeEstimationsSlice.actions,
  loadImEstimation,
  loadMaxTradeAmount,
  loadProductFee
};
