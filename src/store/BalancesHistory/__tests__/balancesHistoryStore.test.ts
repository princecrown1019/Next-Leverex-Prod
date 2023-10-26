import { createTestStore } from '~/store/configureStore';
import { BalancesHistoryState } from '../types';
import { initialState, balancesHistoryActions } from '../slice';

const preloadState = (state?: Partial<BalancesHistoryState>) => ({ balancesHistory: { ...initialState, ...state } });

describe('Balances history store', () => {
  describe('initial state', () => {
    const store = createTestStore(preloadState());

    it('should contain initial data after initialisation', () => {
      expect(store.getState().balancesHistory).toEqual(initialState);
    });
  });

  describe('actions', () => {
    describe('loadBalancesHistory', () => {
      const store = createTestStore(preloadState({ error: { balances: 'some error' } }));

      store.dispatch(balancesHistoryActions.loadBalancesHistory({ startTime: 0, endTime: 1 }));
      const { balancesHistory } = store.getState();

      it('should set [loading] to "true"', () => {
        expect(balancesHistory?.loading.balances).toBeTruthy();
      });

      it('should set [error] to "null"', () => {
        expect(balancesHistory?.error.balances).toBeNull();
      });
    });

    describe('loadBalancesHistoryFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { balances: true } }));
      const balance = { openingBalance: '10', closingBalance: '20' };

      store.dispatch(balancesHistoryActions.loadBalancesHistoryFulfilled(balance));
      const { balancesHistory } = store.getState();

      it('should set [loading] to "false"', () => {
        expect(balancesHistory?.loading.balances).toBeFalsy();
      });

      it('should fill opening and closing fields with data form the response', () => {
        expect(balancesHistory?.openingBalance).toEqual(Number(balance.openingBalance));
        expect(balancesHistory?.closingBalance).toEqual(Number(balance.closingBalance));
      });
    });

    describe('loadBalancesHistoryRejected', () => {
      const store = createTestStore(preloadState({ loading: { balances: true } }));
      const error = 'failed to load test error';

      store.dispatch(balancesHistoryActions.loadBalancesHistoryRejected(error));
      const { balancesHistory } = store.getState();

      it('should set [loading] to "false"', () => {
        expect(balancesHistory?.loading.balances).toBeFalsy();
      });

      it('should set [error] to the error value from the response', () => {
        expect(balancesHistory?.error.balances).toEqual(error);
      });
    });
  });
});
