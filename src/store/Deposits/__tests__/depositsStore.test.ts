import { createTestStore } from '~/store/configureStore';
import { DepositsState } from '../types';
import { initialState, depositsActions } from '../slice';
import { Currency } from '~/types/currencyTypes';
import { TransactionType } from '~/types/transactionTypes';

const preloadState = (state?: Partial<DepositsState>) => ({ deposits: { ...initialState, ...state } });

describe('Deposits store', () => {
  describe('initial state', () => {
    const store = createTestStore(preloadState());

    it('should contain initial data after initialisation', () => {
      expect(store.getState().deposits).toEqual(initialState);
    });
  });

  describe('actions', () => {
    describe('loadDeposits', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, deposits: 'some error' } }));

      store.dispatch(depositsActions.loadDeposits());
      const { deposits } = store.getState();

      it('should set [loading] to "true"', () => {
        expect(deposits?.loading.deposits).toBeTruthy();
      });

      it('should set [error] to "null"', () => {
        expect(deposits?.error.deposits).toBeNull();
      });
    });

    describe('loadDepositsFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, deposits: true } }));
      const deposit = {
        txId: 'test',
        currency: Currency.USDT,
        amount: '10',
        type: TransactionType.DEPOSIT as TransactionType.DEPOSIT,
        unblindedLink: 'test',
        nbConf: 1,
        timestamp: 10,
        recvAddress: 'test',
        unconfAddress: 'test',
        outputs: [
          {
            currency: Currency.USDT,
            amount: '10'
          }
        ]
      };

      store.dispatch(depositsActions.loadDepositsFulfilled({ deposits: [deposit] }));
      const { deposits } = store.getState();

      it('should set [loading] to "false"', () => {
        expect(deposits?.loading.deposits).toBeFalsy();
      });

      it('should fill opening and closing fields with data form the response', () => {
        expect(deposits?.deposits[0].txId).toEqual(deposit.txId);
        expect(deposits?.deposits[0].type).toEqual(deposit.type);
        expect(deposits?.deposits[0].nbConf).toEqual(deposit.nbConf);
        expect(deposits?.deposits[0].amount).toEqual(Number(deposit.amount));
        expect(deposits?.deposits[0].currency).toEqual(deposit.currency);
        expect(deposits?.deposits[0].recvAddress).toEqual(deposit.recvAddress);
        expect(deposits?.deposits[0].unconfAddress).toEqual(deposit.unconfAddress);
      });
    });

    describe('loadDepositsRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, deposits: true } }));
      const error = 'failed to load test error';

      store.dispatch(depositsActions.loadDepositsRejected(error));
      const { deposits } = store.getState();

      it('should set [loading] to "false"', () => {
        expect(deposits?.loading.deposits).toBeFalsy();
      });

      it('should set [error] to the error value from the response', () => {
        expect(deposits?.error.deposits).toEqual(error);
      });
    });

    describe('loadDepositAddress', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, depositAddress: 'some error' } }));

      store.dispatch(depositsActions.loadDepositAddress());
      const { deposits } = store.getState();

      it('should set [loading] to "true"', () => {
        expect(deposits?.loading.depositAddress).toBeTruthy();
      });

      it('should set [error] to "null"', () => {
        expect(deposits?.error.depositAddress).toBeNull();
      });
    });

    describe('loadDepositAddressFulfilled', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, depositAddress: 'some error' } }));
      const address = 'test address';

      store.dispatch(depositsActions.loadDepositAddressFulfilled({ address }));
      const { deposits } = store.getState();

      it('should set [loading] to "true"', () => {
        expect(deposits?.depositAddress).toBeTruthy();
      });

      it('should fill [depositAddress] field with data form the response', () => {
        expect(deposits?.depositAddress).toEqual(address);
      });
    });

    describe('loadDepositAddressRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, depositAddress: true } }));
      const error = 'failed to load test error';

      store.dispatch(depositsActions.loadDepositAddressRejected(error));
      const { deposits } = store.getState();

      it('should set [loading] to "false"', () => {
        expect(deposits?.loading.depositAddress).toBeFalsy();
      });

      it('should set [error] to the error value from the response', () => {
        expect(deposits?.error.depositAddress).toEqual(error);
      });
    });
  });
});
