import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Order, OrderStatus, RolloverType } from '~/types/orderTypes';
import { generateRandomString } from '~/services/Random/randomService';

import {
  CancelWorkingOrderReq,
  CreateOrderReq,
  CreateOrderRes,
  CreateWorkingOrderReq,
  LoadOrdersRes,
  OrdersState,
  UpdateOrderRes
} from './types';
import { serializeOrder, serializeOrders } from './serializer';
import {
  createOrder,
  createOrderRequest,
  loadOrders,
  loadOrdersRequest,
  loadSessionOrders,
  loadSessionOrdersRequest
} from './actions';

export const initialState: OrdersState = {
  sessionOrders: [],
  workingOrders: [],
  orders: [],
  offset: 0,
  hasNext: true,

  loadingWorkingIds: [],

  loading: {
    sessionOrders: true,
    orders: false,
    create: false
  },

  error: {
    sessionOrders: null,
    orders: null,
    create: null
  }
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    loadSessionOrdersFulfilled: (state, { payload }: PayloadAction<LoadOrdersRes>) => {
      state.loading.sessionOrders = false;
      state.sessionOrders = serializeOrders(payload.orders);
    },

    loadSessionOrdersRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.sessionOrders = false;
      state.error.sessionOrders = payload;
    },

    loadOrdersFulfilled: (state, { payload }: PayloadAction<LoadOrdersRes>) => {
      state.loading.orders = false;
      state.orders = serializeOrders(payload.orders);
      state.offset = state.offset + payload.orders.length;
      state.hasNext = payload.orders.length === 30;
    },

    loadOrdersRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.orders = false;
      state.error.orders = payload;
    },

    createOrderPreFulfilled: (state, { payload }: PayloadAction<CreateOrderRes>) => {
      if (!payload.reference) return;

      state.loadingWorkingIds = state.loadingWorkingIds.filter((id) => id !== payload.reference);
      state.workingOrders = state.workingOrders.filter((order) => order.id !== payload.reference);
    },

    createOrderFulfilled: (state, { payload }: PayloadAction<UpdateOrderRes>) => {
      state.loading.create = false;
      state.sessionOrders = [serializeOrder(payload.order), ...state.sessionOrders];
    },

    createOrderRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.create = false;
      state.error.create = payload;
    },

    updateOrder: (state, { payload }: PayloadAction<UpdateOrderRes>) => {
      if (payload.order.status !== OrderStatus.PENDING) {
        state.sessionOrders = state.sessionOrders.filter((order) => order.id !== payload.order.id);
      }

      state.orders.push(serializeOrder(payload.order));
    },

    removeOrder: (state, { payload }: PayloadAction<UpdateOrderRes>) => {
      state.sessionOrders = state.sessionOrders.filter((order) => order.id !== payload.order.id);
    },

    createWorkingOrder: (state, { payload }: PayloadAction<CreateWorkingOrderReq>) => {
      state.loading.create = false;
      state.workingOrders = [
        serializeOrder({
          ...payload,
          id: generateRandomString(),
          price: payload.price.toString(),
          quantity: payload.quantity.toString(),
          status: OrderStatus.WORKING,
          rolloverType: RolloverType.NOT_ROLLOVER,
          timestamp: Date.now() / 1000,
          sessionId: '',
          productAgainst: '',
          tradePnl: '',
          tradeIm: '',
          statusText: '',
          fee: '',
          referenceExposure: '',
          tradeType: 0,
          cutOffPrice: '',
          clientIsLiquidation: false,
          clientIsDefault: false
        }),
        ...state.workingOrders
      ];
    },

    updateWorkingOrder: (state, { payload }: PayloadAction<Partial<Order<number>>>) => {
      state.loading.create = false;
      state.workingOrders = state.workingOrders.map((order) => {
        return order.id === payload.id ? { ...order, ...payload } : order;
      });
    },

    cancelWorkingOrder: (state, { payload }: PayloadAction<CancelWorkingOrderReq>) => {
      state.workingOrders = state.workingOrders.filter((order) => {
        if (payload.id) {
          return order.id !== payload.id;
        } else {
          return order.side === payload.side && order.productType === payload.productType
            ? order.price !== payload.price
            : true;
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadSessionOrdersRequest.type, (state) => {
      state.loading.sessionOrders = true;
      state.error.sessionOrders = null;
    });

    builder.addCase(loadOrdersRequest.type, (state) => {
      state.loading.orders = true;
      state.error.orders = null;
    });

    builder.addCase(createOrderRequest.type, (state, { payload }: PayloadAction<CreateOrderReq<number>>) => {
      state.loading.create = true;
      state.error.create = null;

      if (payload.reference) {
        state.loadingWorkingIds.push(payload.reference);
      }
    });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const ordersActions = {
  ...ordersSlice.actions,
  loadSessionOrders,
  loadOrders,
  createOrder
};
