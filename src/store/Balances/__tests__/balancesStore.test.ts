import { Currency } from '~/types/currencyTypes';
import { AccountType } from '~/types/sessionTypes';
import { createTestStore } from '~/store/configureStore';
import { sessionActions } from '~/store/Session/slice';
import { BalancesState } from '../types';
import { initialState, balancesActions } from '../slice';

const preloadState = (state?: Partial<BalancesState>) => ({ balances: { ...initialState, ...state } });

describe('Balances store', () => {
  describe('initial state', () => {
    const store = createTestStore(preloadState());

    it('should contain initial data after initialisation', () => {
      expect(store.getState().balances).toEqual(initialState);
    });
  });

  describe('actions', () => {
    describe('loadBalances', () => {
      const store = createTestStore(preloadState({ error: null }));

      store.dispatch(balancesActions.loadBalances());
      const { balances } = store.getState();

      it('should set [loading] to "true"', () => {
        expect(balances?.loading).toBeTruthy();
      });

      it('should set [error] to "null"', () => {
        expect(balances?.error).toBeNull();
      });
    });

    describe('loadBalancesFulfilled', () => {
      const store = createTestStore(preloadState({ loading: true }));
      const balance = { balance: '1111.11', currency: Currency.USD };

      store.dispatch(balancesActions.loadBalancesFulfilled({ balances: [balance] }));
      const { balances } = store.getState();

      it('should set [loading] to "false"', () => {
        expect(balances?.loading).toBeFalsy();
      });

      it('should fill [balances] with data form the response', () => {
        expect(balances?.balances[0].currency).toEqual(balance.currency);
        expect(balances?.balances[0].balance).toEqual(Number(balance.balance));
      });
    });

    describe('loadBalancesRejected', () => {
      const store = createTestStore(preloadState({ loading: true }));
      const error = 'failed to load test error';

      store.dispatch(balancesActions.loadBalancesRejected(error));
      const { balances } = store.getState();

      it('should set [loading] to "false"', () => {
        expect(balances?.loading).toBeFalsy();
      });

      it('should set [error] to the error value from the response', () => {
        expect(balances?.error).toEqual(error);
      });
    });
  });

  describe('middleware', () => {
    const store = createTestStore(preloadState({ error: 'some error' }));
    const payload = { grant: AccountType.UPGRADED, validity: 10_000 };

    store.dispatch(sessionActions.authorizeFulfilled(payload));
    const { balances } = store.getState();

    it('should set [loading] to "true"', () => {
      expect(balances?.loading).toBeTruthy();
    });

    it('should set [error] to "null"', () => {
      expect(balances?.error).toBeNull();
    });
  });
});
