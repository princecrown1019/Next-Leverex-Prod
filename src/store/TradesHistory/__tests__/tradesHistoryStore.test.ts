import { TradeSession, TradesHistoryReference } from '~/types/tradesHistoryTypes';
import { ProductSide, ProductType } from '~/types/productTypes';
import { Order, OrderStatus, RolloverType } from '~/types/orderTypes';
import { createTestStore } from '~/store/configureStore';
import { TradesHistoryState } from '../types';
import { initialState, tradesHistoryActions } from '../slice';

const session: TradeSession<string> = {
  hasDefault: false,
  productType: ProductType.BTC_USDT,
  fee: '1',
  rolloverType: RolloverType.NOT_ROLLOVER,
  timeEnd: 1,
  timeStart: 2,
  id: '21',
  close: '21',
  open: '213',
  nbTradesBuy: 2,
  nbTradesSell: 3,
  pnl: '213',
  volume: '1',
  hasLiquidation: false,

  nbTrades: 0,
  clientHasSells: true,
  clientHasBuys: true
};

const order: Order<string> = {
  status: OrderStatus.PENDING,
  fee: '1',
  cutOffPrice: '1',
  rolloverType: RolloverType.NOT_ROLLOVER,
  productType: ProductType.BTC_USDT,
  referenceExposure: '1',
  price: '24132.32',
  side: ProductSide.SELL,
  tradeIm: '',
  tradePnl: '',
  timestamp: 1,
  sessionId: '213',
  statusText: '',
  productAgainst: '',
  quantity: '2',
  id: '1',
  tradeType: 1,

  clientIsDefault: false,
  clientIsLiquidation: false
};

const preloadState = (state?: Partial<TradesHistoryState>) => ({ tradesHistory: { ...initialState, ...state } });

describe('Trade History store', () => {
  describe('initial state', () => {
    const store = createTestStore();

    it('should contain initial data after initialisation', () => {
      expect(store.getState().tradesHistory).toEqual(initialState);
    });
  });

  describe('actions', () => {
    describe('loadDaysHistory', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, days: 'some error' } }));
      const payload = { limit: 10, offset: 0, productType: ProductType.BTC_USDT };

      store.dispatch(tradesHistoryActions.loadDaysHistory(payload));
      const { tradesHistory } = store.getState();

      it('should set [loading.days] to "true"', () => {
        expect(tradesHistory.loading).toEqual({ ...initialState.loading, days: true });
      });

      it('should set [error.days] to "null"', () => {
        expect(tradesHistory?.error).toEqual({ ...initialState.error, days: null });
      });
    });

    describe('loadDaysHistoryFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, days: true } }));

      store.dispatch(tradesHistoryActions.loadDaysHistoryFulfilled({ days: [session] }));
      const { tradesHistory } = store.getState();

      it('should set [loading.days] to "false"', () => {
        expect(tradesHistory?.loading).toEqual({ ...initialState.loading, days: false });
      });

      it('should set [offset.days] to "1"', () => {
        expect(tradesHistory?.offset).toEqual({ ...initialState.offset, days: 1 });
      });

      it('should set [hasNext.days] to "false"', () => {
        expect(tradesHistory?.hasNext).toEqual({ ...initialState.hasNext, days: false });
      });

      it('should fill [days] with data from the response', () => {
        expect(tradesHistory?.days[0].fee).toEqual(Number(session.fee));
        expect(tradesHistory?.days[0].pnl).toEqual(Number(session.pnl));
        expect(tradesHistory?.days[0].open).toEqual(Number(session.open));
        expect(tradesHistory?.days[0].close).toEqual(Number(session.close));
        expect(tradesHistory?.days[0].volume).toEqual(Number(session.volume));
        expect(tradesHistory?.days[0].nbTrades).toEqual(session.nbTradesBuy + session.nbTradesSell);
        expect(tradesHistory?.days[0].timeStart).toEqual(session.timeStart * 1000);
        expect(tradesHistory?.days[0].timeEnd).toEqual(session.timeEnd * 1000);
      });
    });

    describe('loadDaysHistoryRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, days: true } }));
      const error = 'failed to load test error';

      store.dispatch(tradesHistoryActions.loadDaysHistoryRejected(error));
      const { tradesHistory } = store.getState();

      it('should set [loading.days] to "false"', () => {
        expect(tradesHistory?.loading).toEqual({ ...initialState.loading, days: false });
      });

      it('should set [error.days] to error form the response', () => {
        expect(tradesHistory?.error).toEqual({ ...initialState.error, days: error });
      });
    });

    describe('loadSessionsHistory', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, sessions: 'some error' } }));
      const payload = { startTime: 1, endTime: 2, productType: ProductType.BTC_USDT };

      store.dispatch(tradesHistoryActions.loadSessionsHistory(payload));
      const { tradesHistory } = store.getState();

      it('should set [loading.sessions] to "true"', () => {
        expect(tradesHistory.loading).toEqual({ ...initialState.loading, sessions: true });
      });

      it('should set [error.sessions] to "null"', () => {
        expect(tradesHistory?.error).toEqual({ ...initialState.error, sessions: null });
      });
    });

    describe('loadSessionsHistoryFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, sessions: true } }));

      store.dispatch(tradesHistoryActions.loadSessionsHistoryFulfilled({ sessions: [session] }));
      const { tradesHistory } = store.getState();

      it('should set [loading.sessions] to "false"', () => {
        expect(tradesHistory?.loading).toEqual({ ...initialState.loading, sessions: false });
      });

      it('should fill [sessions] with data from the response', () => {
        expect(tradesHistory?.sessions[0].fee).toEqual(Number(session.fee));
        expect(tradesHistory?.sessions[0].pnl).toEqual(Number(session.pnl));
        expect(tradesHistory?.sessions[0].open).toEqual(Number(session.open));
        expect(tradesHistory?.sessions[0].close).toEqual(Number(session.close));
        expect(tradesHistory?.sessions[0].volume).toEqual(Number(session.volume));
        expect(tradesHistory?.sessions[0].nbTrades).toEqual(session.nbTradesBuy + session.nbTradesSell);
        expect(tradesHistory?.sessions[0].timeStart).toEqual(session.timeStart * 1000);
        expect(tradesHistory?.sessions[0].timeEnd).toEqual(session.timeEnd * 1000);
      });
    });

    describe('loadSessionsHistoryRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, sessions: true } }));
      const error = 'failed to load test error';

      store.dispatch(tradesHistoryActions.loadSessionsHistoryRejected(error));
      const { tradesHistory } = store.getState();

      it('should set [loading.sessions] to "false"', () => {
        expect(tradesHistory?.loading).toEqual({ ...initialState.loading, sessions: false });
      });

      it('should set [error.sessions] to error form the response', () => {
        expect(tradesHistory?.error).toEqual({ ...initialState.error, sessions: error });
      });
    });

    describe('loadOrdersHistory', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, orders: 'some error' } }));
      const payload = {
        startTime: 1,
        endTime: 2,
        limit: 100,
        offset: 0,
        date: '2022-02-23',
        productType: ProductType.BTC_USDT
      };

      store.dispatch(tradesHistoryActions.loadOrdersHistory(payload));
      const { tradesHistory } = store.getState();

      it('should set [loading.orders] to "true"', () => {
        expect(tradesHistory.loading).toEqual({ ...initialState.loading, orders: true });
      });

      it('should set to [startTime.orders] value from the payload', () => {
        expect(tradesHistory.startTime).toEqual({ ...initialState.startTime, orders: payload.startTime });
      });

      it('should set to [endTime.orders] value from the payload', () => {
        expect(tradesHistory.endTime).toEqual({ ...initialState.endTime, orders: payload.endTime });
      });

      it('should set [error.orders] to "null"', () => {
        expect(tradesHistory?.error).toEqual({ ...initialState.error, orders: null });
      });
    });

    describe('loadOrdersHistoryFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, orders: true } }));

      store.dispatch(tradesHistoryActions.loadOrdersHistoryFulfilled({ orders: [order] }));
      const { tradesHistory } = store.getState();

      it('should set [loading.orders] to "false"', () => {
        expect(tradesHistory?.loading).toEqual({ ...initialState.loading, orders: false });
      });

      it('should set [offset.orders] to "1"', () => {
        expect(tradesHistory?.offset).toEqual({ ...initialState.offset, orders: 1 });
      });

      it('should fill [orders] with data from the response', () => {
        expect(tradesHistory?.orders[0].fee).toEqual(Number(order.fee));
        expect(tradesHistory?.orders[0].cutOffPrice).toEqual(Number(order.cutOffPrice));
        expect(tradesHistory?.orders[0].tradePnl).toEqual(Number(order.tradePnl));
        expect(tradesHistory?.orders[0].quantity).toEqual(-Number(order.quantity));
        expect(tradesHistory?.orders[0].rolloverType).toEqual(order.rolloverType);
        expect(tradesHistory?.orders[0].productType).toEqual(order.productType);
        expect(tradesHistory?.orders[0].side).toEqual(order.side);
        expect(tradesHistory?.orders[0].referenceExposure).toEqual(Number(order.referenceExposure));
        expect(tradesHistory?.orders[0].timestamp).toEqual(order.timestamp * 1000);
        expect(tradesHistory?.orders[0].clientIsLiquidation).toBeFalsy();
        expect(tradesHistory?.orders[0].clientIsDefault).toBeFalsy();
      });
    });

    describe('loadMaxTradeAmountRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, orders: true } }));
      const error = 'failed to load test error';

      store.dispatch(tradesHistoryActions.loadOrdersHistoryRejected(error));
      const { tradesHistory } = store.getState();

      it('should set [loading.orders] to "false"', () => {
        expect(tradesHistory?.loading).toEqual({ ...initialState.loading, orders: false });
      });

      it('should set [error.orders] to error form the response', () => {
        expect(tradesHistory?.error).toEqual({ ...initialState.error, orders: error });
      });
    });

    describe('loadCsvOrdersHistory', () => {
      const store = createTestStore(
        preloadState({ error: { ...initialState.error, [TradesHistoryReference.DOWNLOAD]: 'some error' } })
      );
      const payload = {
        limit: 100,
        offset: 0,
        productType: ProductType.BTC_USDT,
        reference: TradesHistoryReference.DOWNLOAD
      };

      store.dispatch(tradesHistoryActions.loadCsvOrdersHistory(payload));
      const { tradesHistory } = store.getState();

      it('should set [loading[TradesHistoryReference.DOWNLOAD]] to "true"', () => {
        expect(tradesHistory.loading).toEqual({ ...initialState.loading, [TradesHistoryReference.DOWNLOAD]: true });
      });

      it('should set [error[TradesHistoryReference.DOWNLOAD]] to "null"', () => {
        expect(tradesHistory?.error).toEqual({ ...initialState.error, [TradesHistoryReference.DOWNLOAD]: null });
      });
    });

    describe('loadCsvOrdersHistoryFulfilled', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [TradesHistoryReference.DOWNLOAD]: true } })
      );

      store.dispatch(tradesHistoryActions.loadCsvOrdersHistoryFulfilled({ orders: [order] }));
      const { tradesHistory } = store.getState();

      it('should set [loading[TradesHistoryReference.DOWNLOAD]] to "false"', () => {
        expect(tradesHistory?.loading).toEqual({ ...initialState.loading, [TradesHistoryReference.DOWNLOAD]: false });
      });

      it('should set [offset[TradesHistoryReference.DOWNLOAD]] to "1"', () => {
        expect(tradesHistory?.offset).toEqual({ ...initialState.offset, [TradesHistoryReference.DOWNLOAD]: 1 });
      });

      it('should set [hasNext[TradesHistoryReference.DOWNLOAD]] to "false"', () => {
        expect(tradesHistory?.hasNext).toEqual({ ...initialState.hasNext, [TradesHistoryReference.DOWNLOAD]: false });
      });

      it('should fill [[TradesHistoryReference.DOWNLOAD]] with data from the response', () => {
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].fee).toEqual(Number(order.fee));
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].cutOffPrice).toEqual(Number(order.cutOffPrice));
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].tradePnl).toEqual(Number(order.tradePnl));
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].quantity).toEqual(-Number(order.quantity));
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].rolloverType).toEqual(order.rolloverType);
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].productType).toEqual(order.productType);
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].side).toEqual(order.side);
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].referenceExposure).toEqual(
          Number(order.referenceExposure)
        );
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].timestamp).toEqual(order.timestamp * 1000);
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].clientIsLiquidation).toBeFalsy();
        expect(tradesHistory?.[TradesHistoryReference.DOWNLOAD][0].clientIsDefault).toBeFalsy();
      });
    });

    describe('loadCsvOrdersHistoryRejected', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [TradesHistoryReference.DOWNLOAD]: true } })
      );
      const error = 'failed to load test error';

      store.dispatch(tradesHistoryActions.loadCsvOrdersHistoryRejected(error));
      const { tradesHistory } = store.getState();

      it('should set [loading[TradesHistoryReference.DOWNLOAD]] to "false"', () => {
        expect(tradesHistory?.loading).toEqual({ ...initialState.loading, [TradesHistoryReference.DOWNLOAD]: false });
      });

      it('should set [error[TradesHistoryReference.DOWNLOAD]] to error form the response', () => {
        expect(tradesHistory?.error).toEqual({ ...initialState.error, [TradesHistoryReference.DOWNLOAD]: error });
      });
    });
  });

  describe('middleware', () => {
    describe('csv', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [TradesHistoryReference.DOWNLOAD]: true } })
      );

      store.dispatch(
        tradesHistoryActions.loadCsvOrdersHistoryFulfilled({
          orders: Array.from<Order<string>>({ length: 100 }).fill(order)
        })
      );
      const { tradesHistory } = store.getState();

      it('should not change [loading[TradesHistoryReference.DOWNLOAD]] to "false"', () => {
        expect(tradesHistory?.loading).toEqual({ ...initialState.loading, [TradesHistoryReference.DOWNLOAD]: true });
      });
    });
  });
});
