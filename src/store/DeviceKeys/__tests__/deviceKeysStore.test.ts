import { createTestStore } from '~/store/configureStore';
import { initialState as sessionInitialState } from '~/store/Session/slice';
import { DeviceKeysState } from '../types';
import { initialState, deviceKeysActions } from '../slice';

const preloadState = (state?: Partial<DeviceKeysState>) => ({
  deviceKeys: { ...initialState, ...state },
  session: { ...sessionInitialState, token: { value: 'testToken', expiresIn: 1, expirationDate: 1 } }
});

describe('Device Keys store', () => {
  describe('initial state', () => {
    const store = createTestStore();

    it('should contain initial data after initialisation', () => {
      expect(store.getState().deviceKeys).toEqual(initialState);
    });
  });

  describe('actions', () => {
    const deviceKey = {
      created: new Date().toDateString(),
      updated: new Date().toDateString(),
      status: true,
      key: 'test11key',
      label: 'test key'
    };

    describe('loadTradingDay', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, deviceKeys: 'some error' } }));

      store.dispatch(deviceKeysActions.loadDeviceKeys());
      const { deviceKeys } = store.getState();

      it('should set [loading.deviceKeys] to "true"', () => {
        expect(deviceKeys?.loading).toEqual({ ...initialState.loading, deviceKeys: true });
      });

      it('should set [error.deviceKeys] to "null"', () => {
        expect(deviceKeys?.error).toEqual({ ...initialState.error, deviceKeys: null });
      });
    });

    describe('loadDeviceKeysFulfilled', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, deviceKeys: true } }));

      store.dispatch(deviceKeysActions.loadDeviceKeysFulfilled([deviceKey]));
      const { deviceKeys } = store.getState();

      it('should set [loading.deviceKeys] to "false"', () => {
        expect(deviceKeys?.loading).toEqual({ ...initialState.loading, deviceKeys: false });
      });

      it('should fill the [deviceKeys] with data form the response', () => {
        expect(deviceKeys?.deviceKeys[0].key).toEqual(deviceKey.key);
        expect(deviceKeys?.deviceKeys[0].label).toEqual(deviceKey.label);
        expect(deviceKeys?.deviceKeys[0].status).toEqual(deviceKey.status);
        expect(deviceKeys?.deviceKeys[0].created).not.toBeNaN();
        expect(deviceKeys?.deviceKeys[0].updated).not.toBeNaN();
      });
    });

    describe('loadDeviceKeysRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, deviceKeys: true } }));
      const error = 'failed to load test error';

      store.dispatch(deviceKeysActions.loadDeviceKeysRejected(error));
      const { deviceKeys } = store.getState();

      it('should set [loading.deviceKeys] to "false"', () => {
        expect(deviceKeys?.loading).toEqual({ ...initialState.loading, deviceKeys: false });
      });

      it('should set [error.deviceKeys] to error form the response', () => {
        expect(deviceKeys?.error).toEqual({ ...initialState.error, deviceKeys: error });
      });
    });

    describe('revokeDeviceKey', () => {
      const store = createTestStore(preloadState({ error: { ...initialState.error, revoke: 'some error' } }));

      store.dispatch(deviceKeysActions.revokeDeviceKey({ kid: deviceKey.key }));
      const { deviceKeys } = store.getState();

      it('should set [loading.revoke] to "true"', () => {
        expect(deviceKeys?.loading).toEqual({ ...initialState.loading, revoke: true });
      });

      it('should set [error.revoke] to "null"', () => {
        expect(deviceKeys?.error).toEqual({ ...initialState.error, revoke: null });
      });
    });

    describe('tradingStatsFulfilled', () => {
      const store = createTestStore(
        preloadState({
          deviceKeys: [{ ...deviceKey, created: 1, updated: 2 }],
          loading: { ...initialState.loading, revoke: true }
        })
      );

      store.dispatch(deviceKeysActions.revokeDeviceKeyFulfilled([{ ...deviceKey, status: false }]));
      const { deviceKeys } = store.getState();

      it('should set [loading.revoke] to "false"', () => {
        expect(deviceKeys?.loading).toEqual({ ...initialState.loading, revoke: false });
      });

      it('should mark the key with [status] "false" in [deviceKeys]', () => {
        expect(deviceKeys?.deviceKeys[0].status).toBeFalsy();
      });
    });

    describe('revokeDeviceKeyRejected', () => {
      const store = createTestStore(preloadState({ loading: { ...initialState.loading, revoke: true } }));
      const error = 'failed to load test error';

      store.dispatch(deviceKeysActions.revokeDeviceKeyRejected(error));
      const { deviceKeys } = store.getState();

      it('should set [loading.revoke] to "false"', () => {
        expect(deviceKeys?.loading).toEqual({ ...initialState.loading, revoke: false });
      });

      it('should set [error.revoke] to error form the response', () => {
        expect(deviceKeys?.error).toEqual({ ...initialState.error, revoke: error });
      });
    });
  });
});
