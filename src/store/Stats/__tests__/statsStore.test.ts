import { ProductType } from '~/types/productTypes';
import { createTestStore } from '~/store/configureStore';
import { socketMainActions } from '~/store/SocketMain/slice';
import { StatsState } from '../types';
import { initialState, statsActions } from '../slice';

const preloadState = (state?: Partial<StatsState>) => ({ stats: { ...initialState, ...state } });

describe('Stats store', () => {
  describe('initial state', () => {
    const store = createTestStore(preloadState());

    it('should contain initial data after initialisation', () => {
      expect(store.getState().stats).toEqual(initialState);
    });
  });

  describe('actions', () => {
    describe('loadSessionData', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, sessionData: 'some error' } }));

      store.dispatch(statsActions.loadSessionData({ productType: ProductType.BTC_USDT }));
      const { stats } = store.getState();

      it('should set [loading.sessionData] to "true"', () => {
        expect(stats?.loading).toEqual({ ...initialState.loading, sessionData: true });
      });

      it('should set [error.sessionData] to "null"', () => {
        expect(stats?.error).toEqual({ ...initialState.error, sessionData: null });
      });
    });

    describe('loadSessionDataFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, sessionData: true } }));
      const payload = {
        lastCutOffPrice: '3333.33',
        timeToCutOff: 123_456,
        cutOffAt: 123_456,
        productType: ProductType.BTC_USDT
      };

      store.dispatch(statsActions.loadSessionDataFulfilled(payload));
      const { stats } = store.getState();

      it('should set [loading.sessionData] to "false"', () => {
        expect(stats?.loading).toEqual({ ...initialState.loading, sessionData: false });
      });

      it('should fill the store with data form the response', () => {
        expect(stats?.lastCutOffPrice).toEqual({
          ...initialState.lastCutOffPrice,
          [payload.productType]: Number(payload.lastCutOffPrice)
        });
        expect(stats?.nextCutOffAt).toEqual({
          ...initialState.nextCutOffAt,
          [payload.productType]: payload.cutOffAt * 1000
        });
        expect(stats?.timeToCutOff[payload.productType]).toBeTruthy();
      });
    });

    describe('loadSessionDataRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, sessionData: true } }));
      const error = 'failed to load test error';

      store.dispatch(statsActions.loadSessionDataRejected(error));
      const { stats } = store.getState();

      it('should set [loading.sessionData] to "false"', () => {
        expect(stats?.loading).toEqual({ ...initialState.loading, sessionData: false });
      });

      it('should set [error.sessionData] to error form the response', () => {
        expect(stats?.error).toEqual({ ...initialState.error, sessionData: error });
      });
    });

    describe('loadTradingStats', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, tradingStats: 'some error' } }));

      store.dispatch(statsActions.loadTradingStats({ productType: ProductType.BTC_USDT }));
      const { stats } = store.getState();

      it('should set [loading.tradingStats] to "true"', () => {
        expect(stats?.loading).toEqual({ ...initialState.loading, tradingStats: true });
      });

      it('should set [error.tradingStats] to "null"', () => {
        expect(stats?.error).toEqual({ ...initialState.error, tradingStats: null });
      });
    });

    describe('tradingStatsFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, tradingStats: true } }));
      const payload = {
        dailyVolume: '1111.1',
        cutoff: '2222.22',
        openInterest: '33.33232332',
        productType: ProductType.BTC_USDT
      };

      store.dispatch(statsActions.loadTradingStatsFulfilled(payload));
      const { stats } = store.getState();

      it('should set [loading.tradingStats] to "false"', () => {
        expect(stats?.loading).toEqual({ ...initialState.loading, tradingStats: false });
      });

      it('should fill the store with data form the response', () => {
        expect(stats?.dailyVolume).toEqual({
          ...initialState.dailyVolume,
          [payload.productType]: Number(payload.dailyVolume)
        });
        expect(stats?.openInterest).toEqual({
          ...initialState.openInterest,
          [payload.productType]: Number(payload.openInterest)
        });
      });
    });

    describe('tradingStatsRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, tradingStats: true } }));
      const error = 'failed to load test error';

      store.dispatch(statsActions.loadTradingStatsRejected(error));
      const { stats } = store.getState();

      it('should set [loading.tradingStats] to "false"', () => {
        expect(stats?.loading).toEqual({ ...initialState.loading, tradingStats: false });
      });

      it('should set [error.tradingStats] to error form the response', () => {
        expect(stats?.error).toEqual({ ...initialState.error, tradingStats: error });
      });
    });
  });

  describe('middleware', () => {
    const store = createTestStore(
      preloadState({ error: { ...initialState.error, sessionData: 'some error', tradingStats: 'some error' } })
    );

    store.dispatch(socketMainActions.connectFulfilled());
    const { stats } = store.getState();

    it('should set [loading.sessionData] and [loading.tradingStats] to "true"', () => {
      expect(stats?.loading).toEqual({ ...initialState.loading, sessionData: true, tradingStats: true });
    });

    it('should set [error.sessionData] and [error.tradingStats] to "null"', () => {
      expect(stats?.error).toEqual({ ...initialState.error, sessionData: null, tradingStats: null });
    });
  });
});
