import { ProductSide, ProductType } from '~/types/productTypes';
import { createTestStore } from '~/store/configureStore';
import { TradeEstimationsState } from '../types';
import { initialState, tradeEstimationsActions } from '../slice';

const preloadState = (state?: Partial<TradeEstimationsState>) => ({ tradeEstimations: { ...initialState, ...state } });

describe('Trade Estimations store', () => {
  describe('initial state', () => {
    const store = createTestStore();

    it('should contain initial data after initialisation', () => {
      expect(store.getState().tradeEstimations).toEqual(initialState);
    });
  });

  describe('actions', () => {
    describe('loadProductFee', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, productFee: 'some error' } }));

      store.dispatch(tradeEstimationsActions.loadProductFee({ productType: ProductType.BTC_USDT }));
      const { tradeEstimations } = store.getState();

      it('should set [loading.productFee] to "true"', () => {
        expect(tradeEstimations.loading).toEqual({ ...initialState.loading, productFee: true });
      });

      it('should set [error.productFee] to "null"', () => {
        expect(tradeEstimations?.error).toEqual({ ...initialState.error, productFee: null });
      });
    });

    describe('loadProductFeeFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, productFee: true } }));
      const payload = { productType: ProductType.BTC_USDT, fee: '44.44', feeCcy: 'test ccy', im: '3444.45' };

      store.dispatch(tradeEstimationsActions.loadProductFeeFulfilled(payload));
      const { tradeEstimations } = store.getState();

      it('should set [loading.productFee] to "false"', () => {
        expect(tradeEstimations?.loading).toEqual({ ...initialState.loading, productFee: false });
      });

      it('should set data from the response to [productFee]', () => {
        expect(tradeEstimations?.productFee?.im).toEqual(Number(payload.im));
        expect(tradeEstimations?.productFee?.fee).toEqual(Number(payload.fee));
      });
    });

    describe('loadProductFeeRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, productFee: true } }));
      const error = 'failed to load test error';

      store.dispatch(tradeEstimationsActions.loadProductFeeRejected(error));
      const { tradeEstimations } = store.getState();

      it('should set [loading.productFee] to "false"', () => {
        expect(tradeEstimations?.loading).toEqual({ ...initialState.loading, productFee: false });
      });

      it('should set [error.productFee] to error form the response', () => {
        expect(tradeEstimations?.error).toEqual({ ...initialState.error, productFee: error });
      });
    });

    describe('loadImEstimation', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, imEstimation: 'some error' } }));
      const payload = { productType: ProductType.BTC_USDT, qty: 0.4, side: ProductSide.SELL };

      store.dispatch(tradeEstimationsActions.loadImEstimation(payload));
      const { tradeEstimations } = store.getState();

      it('should set [loading.imEstimation] to "true"', () => {
        expect(tradeEstimations.loading).toEqual({ ...initialState.loading, imEstimation: true });
      });

      it('should set [error.imEstimation] to "null"', () => {
        expect(tradeEstimations?.error).toEqual({ ...initialState.error, imEstimation: null });
      });
    });

    describe('loadImEstimationFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, imEstimation: true } }));
      const payload = { productType: ProductType.BTC_USDT, expectedImReservation: '4444.44', feeAmount: '123.32' };

      store.dispatch(tradeEstimationsActions.loadImEstimationFulfilled(payload));
      const { tradeEstimations } = store.getState();

      it('should set [loading.imEstimation] to "false"', () => {
        expect(tradeEstimations?.loading).toEqual({ ...initialState.loading, imEstimation: false });
      });

      it('should set data from the response to [imEstimation]', () => {
        expect(tradeEstimations?.imEstimation?.feeAmount).toEqual(Number(payload.feeAmount));
        expect(tradeEstimations?.imEstimation?.expectedImReservation).toEqual(Number(payload.expectedImReservation));
      });
    });

    describe('loadImEstimationRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, imEstimation: true } }));
      const error = 'failed to load test error';

      store.dispatch(tradeEstimationsActions.loadImEstimationRejected(error));
      const { tradeEstimations } = store.getState();

      it('should set [loading.imEstimation] to "false"', () => {
        expect(tradeEstimations?.loading).toEqual({ ...initialState.loading, imEstimation: false });
      });

      it('should set [error.imEstimation] to error form the response', () => {
        expect(tradeEstimations?.error).toEqual({ ...initialState.error, imEstimation: error });
      });
    });

    describe('loadMaxTradeAmount', () => {
      const store = createTestStore(
        preloadState({ error: { ...initialState.error, maxTradeAmount: { [ProductSide.BUY]: 'some error' } } })
      );
      const payload = { productType: ProductType.BTC_USDT, side: ProductSide.BUY };

      store.dispatch(tradeEstimationsActions.loadMaxTradeAmount(payload));
      const { tradeEstimations } = store.getState();

      it('should set [loading.maxTradeAmount] to "true"', () => {
        expect(tradeEstimations.loading).toEqual({ ...initialState.loading, maxTradeAmount: true });
      });

      it('should set [error.maxTradeAmount] to "null"', () => {
        expect(tradeEstimations?.error.maxTradeAmount).toEqual({ [ProductSide.BUY]: null });
      });
    });

    describe('loadMaxTradeAmountFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, maxTradeAmount: true } }));
      const payload = { productType: ProductType.BTC_USDT, fee: '12.33', side: ProductSide.SELL, qty: '0.0433342' };

      store.dispatch(tradeEstimationsActions.loadMaxTradeAmountFulfilled(payload));
      const { tradeEstimations } = store.getState();

      it('should set [loading.maxTradeAmount] to "false"', () => {
        expect(tradeEstimations?.loading).toEqual({ ...initialState.loading, maxTradeAmount: false });
      });

      it('should set data from the response to [maxTradeAmount]', () => {
        expect(tradeEstimations?.maxTradeAmount?.[payload.productType]?.[payload.side]).toEqual(Number(payload.qty));
      });
    });

    describe('loadMaxTradeAmountRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, maxTradeAmount: true } }));
      const error = 'failed to load test error';

      store.dispatch(
        tradeEstimationsActions.loadMaxTradeAmountRejected({
          productType: ProductType.BTC_USDT,
          fee: '12.33',
          side: ProductSide.SELL,
          qty: '0.0433342',
          errorMsg: error
        })
      );
      const { tradeEstimations } = store.getState();

      it('should set [loading.maxTradeAmount] to "false"', () => {
        expect(tradeEstimations?.loading).toEqual({ ...initialState.loading, maxTradeAmount: false });
      });

      it('should set [error.maxTradeAmount] to error form the response', () => {
        expect(tradeEstimations?.error.maxTradeAmount).toEqual({ [ProductSide.SELL]: error });
      });
    });
  });
});
