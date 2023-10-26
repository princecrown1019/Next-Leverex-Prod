import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TradesHistoryReference } from '~/types/tradesHistoryTypes';
import { serializeSessions, serializeOrders, serializeDays, serializeSession } from '~/store/TradesHistory/serializer';
import { toMilliseconds } from '~/services/DateFormat/dateFormatService';

import {
  LoadSessionsRes,
  LoadOrdersRes,
  TradesHistoryState,
  LoadTradesSocketReq,
  ResetDayReq,
  LoadDaysRes,
  LoadDaysSocketReq,
  LoadCsvTradesSocketReq
} from './types';
import {
  loadOrdersHistory,
  loadOrdersHistoryRequest,
  loadSessionsHistory,
  loadSessionsHistoryRequest,
  loadDaysHistory,
  loadDaysHistoryRequest,
  loadCsvOrdersHistory,
  loadCsvOrdersHistoryRequest
} from './actions';

export const initialState: TradesHistoryState = {
  orders: [],
  sessions: [],
  days: [],
  openSession: null,

  [TradesHistoryReference.DOWNLOAD]: [],

  startTime: {
    orders: null,
    sessions: null,
    days: null,
    [TradesHistoryReference.DOWNLOAD]: null
  },

  endTime: {
    orders: null,
    sessions: null,
    days: null,
    [TradesHistoryReference.DOWNLOAD]: null
  },

  offset: {
    orders: 0,
    sessions: 0,
    days: 0,
    [TradesHistoryReference.DOWNLOAD]: 0
  },

  hasNext: {
    orders: true,
    sessions: true,
    days: true,
    [TradesHistoryReference.DOWNLOAD]: true
  },

  loading: {
    orders: false,
    sessions: false,
    days: false,
    [TradesHistoryReference.DOWNLOAD]: false
  },

  error: {
    orders: null,
    sessions: null,
    days: null,
    [TradesHistoryReference.DOWNLOAD]: null
  }
};

const tradesHistorySlice = createSlice({
  name: 'tradeHistory',
  initialState,
  reducers: {
    loadOrdersHistoryFulfilled: (state, { payload }: PayloadAction<LoadOrdersRes>) => {
      state.loading.orders = false;
      state.orders = serializeOrders(state.orders, payload.orders);
      state.offset.orders = state.offset.orders + payload.orders.length;
      state.hasNext.orders = !!payload.orders.length;
    },

    loadOrdersHistoryRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.orders = false;
      state.error.orders = payload;
    },

    loadSessionsHistoryFulfilled: (state, { payload }: PayloadAction<LoadSessionsRes>) => {
      state.loading.sessions = false;
      state.sessions = serializeSessions(state.sessions, payload.sessions);

      if (payload.sessions[0] && !Number(payload.sessions[0].close)) {
        state.openSession = serializeSession(payload.sessions[0]);
      }
    },

    loadSessionsHistoryRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.sessions = false;
      state.error.sessions = payload;
    },

    loadLastTwoSessionsRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.sessions = false;
      state.error.sessions = payload;
    },

    loadDaysHistoryFulfilled: (state, { payload }: PayloadAction<LoadDaysRes>) => {
      state.loading.days = false;

      if (state.offset.days) {
        state.days.push(...serializeDays(payload.days));
      } else {
        state.days = serializeDays(payload.days);
        state.orders = [];
        state.hasNext.orders = true;
        state.offset.orders = 0;
        state.sessions = [];
      }

      state.offset.days = state.offset.days + payload.days.length;
      state.hasNext.days = payload.days.length === 60;
    },

    loadDaysHistoryRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading.days = false;
      state.error.days = payload;
    },

    loadCsvOrdersHistoryFulfilled: (state, { payload }: PayloadAction<LoadOrdersRes>) => {
      state.loading[TradesHistoryReference.DOWNLOAD] = payload.orders.length === 100;
      state.hasNext[TradesHistoryReference.DOWNLOAD] = payload.orders.length === 100;
      state.offset[TradesHistoryReference.DOWNLOAD] =
        state.offset[TradesHistoryReference.DOWNLOAD] + payload.orders.length;
      state[TradesHistoryReference.DOWNLOAD] = serializeOrders(state[TradesHistoryReference.DOWNLOAD], payload.orders);
      state.error[TradesHistoryReference.DOWNLOAD] = null;
    },

    loadCsvOrdersHistoryRejected: (state, { payload }: PayloadAction<string>) => {
      state.loading[TradesHistoryReference.DOWNLOAD] = false;
      state.error[TradesHistoryReference.DOWNLOAD] = payload;
    },

    resetDay: (state, { payload }: PayloadAction<ResetDayReq>) => {
      const endTime = payload.endTime || Date.now();

      state.sessions = state.sessions.filter((session) => {
        return session.timeStart > endTime || session.timeStart < payload.startTime;
      });

      state.orders = state.orders.filter((order) => {
        return order.timestamp > endTime || order.timestamp < payload.startTime;
      });
    },

    resetCsv: (state) => {
      state.loading[TradesHistoryReference.DOWNLOAD] = false;
      state.hasNext[TradesHistoryReference.DOWNLOAD] = true;
      state.offset[TradesHistoryReference.DOWNLOAD] = 0;
      state[TradesHistoryReference.DOWNLOAD] = [];
      state.endTime[TradesHistoryReference.DOWNLOAD] = null;
      state.startTime[TradesHistoryReference.DOWNLOAD] = null;
      state.error[TradesHistoryReference.DOWNLOAD] = null;
    },

    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(loadOrdersHistoryRequest.type, (state, { payload }: PayloadAction<LoadTradesSocketReq>) => {
      state.loading.orders = true;
      state.error.orders = null;

      if (payload.tradeHistory.startTime && payload.tradeHistory.endTime) {
        state.startTime.orders = toMilliseconds(payload.tradeHistory.startTime);
        state.endTime.orders = toMilliseconds(payload.tradeHistory.endTime);
      }

      if (payload.tradeHistory.offset === 0) {
        state.offset.orders = 0;
        state.hasNext.orders = true;
      }
    });

    builder.addCase(loadSessionsHistoryRequest.type, (state) => {
      state.loading.sessions = true;
      state.error.sessions = null;
    });

    builder.addCase(loadDaysHistoryRequest.type, (state, { payload }: PayloadAction<LoadDaysSocketReq>) => {
      state.loading.days = true;
      state.error.days = null;

      if (payload.tradingDaysHistory.offset === 0) {
        state.days = [];
        state.orders = [];
        state.sessions = [];
        state.openSession = null;
        state.hasNext.days = true;
        state.offset.days = 0;
      }
    });

    builder.addCase(loadCsvOrdersHistoryRequest.type, (state, { payload }: PayloadAction<LoadCsvTradesSocketReq>) => {
      state.loading[TradesHistoryReference.DOWNLOAD] = true;
      state.error[TradesHistoryReference.DOWNLOAD] = null;

      if (payload.tradeHistory.offset === 0) {
        state.offset[TradesHistoryReference.DOWNLOAD] = 0;
        state[TradesHistoryReference.DOWNLOAD] = [];
        state.hasNext[TradesHistoryReference.DOWNLOAD] = true;
        state.startTime[TradesHistoryReference.DOWNLOAD] = payload.tradeHistory.startTime || null;
        state.endTime[TradesHistoryReference.DOWNLOAD] = payload.tradeHistory.endTime || null;
      }
    });
  }
});

export const tradesHistoryReducer = tradesHistorySlice.reducer;
export const tradesHistoryActions = {
  ...tradesHistorySlice.actions,
  loadOrdersHistory,
  loadSessionsHistory,
  loadDaysHistory,
  loadCsvOrdersHistory
};
