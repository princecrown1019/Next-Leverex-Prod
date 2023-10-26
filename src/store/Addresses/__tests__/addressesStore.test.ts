import { createTestStore } from '~/store/configureStore';
import { AddressesState } from '../types';
import { initialState, addressesActions } from '../slice';

const preloadState = (state?: Partial<AddressesState>) => ({ addresses: { ...initialState, ...state } });

describe('Addresses store', () => {
  describe('initial state', () => {
    const store = createTestStore(preloadState());

    it('should contain initial data after initialisation', () => {
      expect(store.getState().addresses).toEqual(initialState);
    });
  });

  describe('actions', () => {
    const address = { address: 'test1', description: 'test2', addedTimestamp: Date.now() / 1000 };

    describe('loadAddresses', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, addresses: 'some error' } }));

      store.dispatch(addressesActions.loadAddresses());
      const { addresses } = store.getState();

      it('should set [loading.addresses] to "true"', () => {
        expect(addresses?.loading).toEqual({ ...initialState.loading, addresses: true });
      });

      it('should set [error.addresses] to "null"', () => {
        expect(addresses?.error).toEqual({ ...initialState.error, addresses: null });
      });
    });

    describe('loadAddressesFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, addresses: true } }));

      store.dispatch(addressesActions.loadAddressesFulfilled({ addresses: [address] }));
      const { addresses } = store.getState();

      it('should set [loading.addresses] to "false"', () => {
        expect(addresses?.loading).toEqual({ ...initialState.loading, addresses: false });
      });

      it('should fill [addresses] with data form the response', () => {
        expect(addresses?.addresses[0].address).toEqual(address.address);
        expect(addresses?.addresses[0].description).toEqual(address.description);
        expect(addresses?.addresses[0].timestamp).toEqual(address.addedTimestamp * 1000);
      });
    });

    describe('loadAddressesRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, addresses: true } }));
      const error = 'failed to load test error';

      store.dispatch(addressesActions.loadAddressesRejected(error));
      const { addresses } = store.getState();

      it('should set [loading.addresses] to "false"', () => {
        expect(addresses?.loading).toEqual({ ...initialState.loading, addresses: false });
      });

      it('should set [error.addresses] to the error value from the response', () => {
        expect(addresses?.error).toEqual({ ...initialState.error, addresses: error });
      });
    });

    describe('whitelistAddress', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, whitelist: 'some error' } }));
      const payload = { description: 'test', address: 'test1' };

      store.dispatch(addressesActions.whitelistAddress(payload));
      const { addresses } = store.getState();

      it('should set [loading.whitelist] to "true"', () => {
        expect(addresses?.loading).toEqual({ ...initialState.loading, whitelist: true });
      });

      it('should set [error.whitelist] to "null"', () => {
        expect(addresses?.error).toEqual({ ...initialState.error, whitelist: null });
      });
    });

    describe('whitelistAddressFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, whitelist: true } }));

      store.dispatch(addressesActions.whitelistAddressFulfilled(address));
      const { addresses } = store.getState();

      it('should set [loading.whitelist] to "false"', () => {
        expect(addresses?.loading).toEqual({ ...initialState.loading, whitelist: false });
      });

      it('should push new whitelisted address to [addresses]', () => {
        expect(addresses?.addresses[0].address).toEqual(address.address);
        expect(addresses?.addresses[0].description).toEqual(address.description);
        expect(addresses?.addresses[0].timestamp).toEqual(address.addedTimestamp * 1000);
      });
    });

    describe('whitelistAddressRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, whitelist: true } }));
      const error = 'failed to whitelist test error';

      store.dispatch(addressesActions.whitelistAddressRejected(error));
      const { addresses } = store.getState();

      it('should set [loading.whitelist] to "false"', () => {
        expect(addresses?.loading).toEqual({ ...initialState.loading, whitelist: false });
      });

      it('should set [error.whitelist] to the error value from the response', () => {
        expect(addresses?.error).toEqual({ ...initialState.error, whitelist: error });
      });
    });

    describe('removeAddress', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, remove: 'some error' } }));

      store.dispatch(addressesActions.removeAddress({ address: 'test' }));
      const { addresses } = store.getState();

      it('should set [loading.whitelist] to "true"', () => {
        expect(addresses?.loading).toEqual({ ...initialState.loading, remove: true });
      });

      it('should set [error.whitelist] to the "null"', () => {
        expect(addresses?.error).toEqual({ ...initialState.error, remove: null });
      });
    });

    describe('removeAddressFulfilled', () => {
      const store = createTestStore(
        preloadState({
          addresses: [{ ...address, timestamp: Date.now() }],
          loading: { ...initialState.loading, remove: true }
        })
      );

      store.dispatch(addressesActions.removeAddressFulfilled({ address: address.address }));
      const { addresses } = store.getState();

      it('should set [loading.remove] to "false"', () => {
        expect(addresses?.loading).toEqual({ ...initialState.loading, remove: false });
      });

      it('should remove address form the response from [error.addresses]', () => {
        expect(addresses?.addresses).toEqual([]);
      });
    });

    describe('removeAddressRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, remove: true } }));
      const error = 'failed to remove test error';

      store.dispatch(addressesActions.removeAddressRejected(error));
      const { addresses } = store.getState();

      it('should set [loading.remove] to "false"', () => {
        expect(addresses?.loading).toEqual({ ...initialState.loading, remove: false });
      });

      it('should set [error.remove] to the error value from the response', () => {
        expect(addresses?.error).toEqual({ ...initialState.error, remove: error });
      });
    });
  });
});
