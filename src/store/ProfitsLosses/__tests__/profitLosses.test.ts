import { ProductType } from '~/types/productTypes';
import { createTestStore } from '~/store/configureStore';
import { initialState as sessionInitialState } from '~/store/Session/slice';
import { ProfitsLossesState } from '../types';
import { initialState, profitsLossesActions } from '../slice';
import { ProfitLossReference } from '~/types/profitLossTypes';

const preloadState = (state?: Partial<ProfitsLossesState>) => ({
  profitsLosses: { ...initialState, ...state },
  session: { ...sessionInitialState, token: { value: 'testToken', expiresIn: 1, expirationDate: 1 } }
});

describe('Profit losses', () => {
  describe('initial state', () => {
    const store = createTestStore();

    it('should contain initial data after initialisation', () => {
      expect(store.getState().profitsLosses).toEqual(initialState);
    });
  });

  describe('actions', () => {
    describe('loadDay', () => {
      const store = createTestStore(
        preloadState({ error: { ...initialState.error, [ProfitLossReference.DAY]: 'some error' } })
      );

      store.dispatch(profitsLossesActions.loadDay({ productType: ProductType.BTC_USDT }));
      const { profitsLosses } = store.getState();

      it('should set [loading.day] to "true"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.DAY]: true });
      });

      it('should set [error.day] to "null"', () => {
        expect(profitsLosses?.error).toEqual({ ...initialState.error, [ProfitLossReference.DAY]: null });
      });
    });

    describe('loadDayFulfilled', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [ProfitLossReference.DAY]: true } })
      );
      const payload = { reference: ProfitLossReference.DAY, productType: ProductType.BTC_USDT, profitLoss: '1' };

      store.dispatch(profitsLossesActions.loadFulfilled(payload));
      const { profitsLosses } = store.getState();

      it('should set [loading.day] to "false"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.DAY]: false });
      });

      it('should fill the [day] with data form the response', () => {
        expect(profitsLosses[ProfitLossReference.DAY]).toEqual(Number(payload.profitLoss));
      });
    });

    describe('loadDayRejected', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [ProfitLossReference.DAY]: true } })
      );
      const payload = {
        reference: ProfitLossReference.DAY,
        productType: ProductType.BTC_USDT,
        profitLoss: '1',
        errorMsg: 'failed to load test error'
      };

      store.dispatch(profitsLossesActions.loadRejected(payload));
      const { profitsLosses } = store.getState();

      it('should set [loading.day] to "false"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.DAY]: false });
      });

      it('should set [error.day] to error form the response', () => {
        expect(profitsLosses?.error).toEqual({ ...initialState.error, [ProfitLossReference.DAY]: payload.errorMsg });
      });
    });

    describe('loadWeek', () => {
      const store = createTestStore(
        preloadState({ error: { ...initialState.error, [ProfitLossReference.WEEK]: 'some error' } })
      );

      store.dispatch(profitsLossesActions.loadWeek({ productType: ProductType.BTC_USDT }));
      const { profitsLosses } = store.getState();

      it('should set [loading.day] to "true"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.WEEK]: true });
      });

      it('should set [error.day] to "null"', () => {
        expect(profitsLosses?.error).toEqual({ ...initialState.error, [ProfitLossReference.WEEK]: null });
      });
    });

    describe('loadWeekFulfilled', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [ProfitLossReference.WEEK]: true } })
      );
      const payload = { reference: ProfitLossReference.WEEK, productType: ProductType.BTC_USDT, profitLoss: '2' };

      store.dispatch(profitsLossesActions.loadFulfilled(payload));
      const { profitsLosses } = store.getState();

      it('should set [loading.week] to "false"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.WEEK]: false });
      });

      it('should fill the [week] with data form the response', () => {
        expect(profitsLosses[ProfitLossReference.WEEK]).toEqual(Number(payload.profitLoss));
      });
    });

    describe('loadWeekRejected', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [ProfitLossReference.WEEK]: true } })
      );
      const payload = {
        reference: ProfitLossReference.WEEK,
        productType: ProductType.BTC_USDT,
        profitLoss: '1',
        errorMsg: 'failed to load test error'
      };

      store.dispatch(profitsLossesActions.loadRejected(payload));
      const { profitsLosses } = store.getState();

      it('should set [loading.week] to "false"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.WEEK]: false });
      });

      it('should set [error.week] to error form the response', () => {
        expect(profitsLosses?.error).toEqual({ ...initialState.error, [ProfitLossReference.WEEK]: payload.errorMsg });
      });
    });

    describe('loadMonth', () => {
      const store = createTestStore(
        preloadState({ error: { ...initialState.error, [ProfitLossReference.MONTH]: 'some error' } })
      );

      store.dispatch(profitsLossesActions.loadMonth({ productType: ProductType.BTC_USDT }));
      const { profitsLosses } = store.getState();

      it('should set [loading.month] to "true"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.MONTH]: true });
      });

      it('should set [error.month] to "null"', () => {
        expect(profitsLosses?.error).toEqual({ ...initialState.error, [ProfitLossReference.MONTH]: null });
      });
    });

    describe('loadMonthFulfilled', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [ProfitLossReference.MONTH]: true } })
      );
      const payload = { reference: ProfitLossReference.MONTH, productType: ProductType.BTC_USDT, profitLoss: '3' };

      store.dispatch(profitsLossesActions.loadFulfilled(payload));
      const { profitsLosses } = store.getState();

      it('should set [loading.month] to "false"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.MONTH]: false });
      });

      it('should fill the [month] with data form the response', () => {
        expect(profitsLosses[ProfitLossReference.MONTH]).toEqual(Number(payload.profitLoss));
      });
    });

    describe('loadMonthRejected', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [ProfitLossReference.MONTH]: true } })
      );
      const payload = {
        reference: ProfitLossReference.MONTH,
        productType: ProductType.BTC_USDT,
        profitLoss: '1',
        errorMsg: 'failed to load test error'
      };

      store.dispatch(profitsLossesActions.loadRejected(payload));
      const { profitsLosses } = store.getState();

      it('should set [loading.month] to "false"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.MONTH]: false });
      });

      it('should set [error.month] to error form the response', () => {
        expect(profitsLosses?.error).toEqual({ ...initialState.error, [ProfitLossReference.MONTH]: payload.errorMsg });
      });
    });

    describe('loadYear', () => {
      const store = createTestStore(
        preloadState({ error: { ...initialState.error, [ProfitLossReference.YEAR]: 'some error' } })
      );

      store.dispatch(profitsLossesActions.loadYear({ productType: ProductType.BTC_USDT }));
      const { profitsLosses } = store.getState();

      it('should set [loading.year] to "true"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.YEAR]: true });
      });

      it('should set [error.year] to "null"', () => {
        expect(profitsLosses?.error).toEqual({ ...initialState.error, [ProfitLossReference.YEAR]: null });
      });
    });

    describe('loadYearFulfilled', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [ProfitLossReference.YEAR]: true } })
      );
      const payload = { reference: ProfitLossReference.YEAR, productType: ProductType.BTC_USDT, profitLoss: '4' };

      store.dispatch(profitsLossesActions.loadFulfilled(payload));
      const { profitsLosses } = store.getState();

      it('should set [loading.year] to "false"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.YEAR]: false });
      });

      it('should fill the [year] with data form the response', () => {
        expect(profitsLosses[ProfitLossReference.YEAR]).toEqual(Number(payload.profitLoss));
      });
    });

    describe('loadYearRejected', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [ProfitLossReference.YEAR]: true } })
      );
      const payload = {
        reference: ProfitLossReference.YEAR,
        productType: ProductType.BTC_USDT,
        profitLoss: '1',
        errorMsg: 'failed to load test error'
      };

      store.dispatch(profitsLossesActions.loadRejected(payload));
      const { profitsLosses } = store.getState();

      it('should set [loading.year] to "false"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.YEAR]: false });
      });

      it('should set [error.year] to error form the response', () => {
        expect(profitsLosses?.error).toEqual({ ...initialState.error, [ProfitLossReference.YEAR]: payload.errorMsg });
      });
    });

    describe('loadAllTime', () => {
      const store = createTestStore(
        preloadState({ error: { ...initialState.error, [ProfitLossReference.ALL_TIME]: 'some error' } })
      );

      store.dispatch(profitsLossesActions.loadAllTime({ productType: ProductType.BTC_USDT }));
      const { profitsLosses } = store.getState();

      it('should set [loading.year] to "true"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.ALL_TIME]: true });
      });

      it('should set [error.year] to "null"', () => {
        expect(profitsLosses?.error).toEqual({ ...initialState.error, [ProfitLossReference.ALL_TIME]: null });
      });
    });

    describe('loadAllTimeFulfilled', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [ProfitLossReference.ALL_TIME]: true } })
      );
      const payload = { reference: ProfitLossReference.ALL_TIME, productType: ProductType.BTC_USDT, profitLoss: '5' };

      store.dispatch(profitsLossesActions.loadFulfilled(payload));
      const { profitsLosses } = store.getState();

      it('should set [loading.year] to "false"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.ALL_TIME]: false });
      });

      it('should fill the [year] with data form the response', () => {
        expect(profitsLosses[ProfitLossReference.ALL_TIME]).toEqual(Number(payload.profitLoss));
      });
    });

    describe('loadAllTimeRejected', () => {
      const store = createTestStore(
        preloadState({ loading: { ...initialState.loading, [ProfitLossReference.ALL_TIME]: true } })
      );
      const payload = {
        reference: ProfitLossReference.ALL_TIME,
        productType: ProductType.BTC_USDT,
        profitLoss: '1',
        errorMsg: 'failed to load test error'
      };

      store.dispatch(profitsLossesActions.loadRejected(payload));
      const { profitsLosses } = store.getState();

      it('should set [loading.year] to "false"', () => {
        expect(profitsLosses?.loading).toEqual({ ...initialState.loading, [ProfitLossReference.ALL_TIME]: false });
      });

      it('should set [error.year] to error form the response', () => {
        expect(profitsLosses?.error).toEqual({
          ...initialState.error,
          [ProfitLossReference.ALL_TIME]: payload.errorMsg
        });
      });
    });
  });
});
