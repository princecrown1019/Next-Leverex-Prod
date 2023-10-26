import { ToastType } from '~/types/toastTypes';
import { createTestStore } from '~/store/configureStore';
import { ToastsState } from '../types';
import { initialState, toastsActions } from '../slice';

const preloadState = (state?: Partial<ToastsState>) => ({ toasts: { ...initialState, ...state } });

describe('Toasts store', () => {
  describe('initial state', () => {
    const store = createTestStore(preloadState());

    it('should contain initial data after initialisation', () => {
      expect(store.getState().toasts).toEqual(initialState);
    });
  });

  describe('actions', () => {
    const payload = { type: ToastType.WARNING, message: 'test' };

    describe('create', () => {
      const store = createTestStore(preloadState());

      store.dispatch(toastsActions.create(payload));
      const { toasts } = store.getState();

      it('should push a new toast with correct data to [toasts]', () => {
        expect(toasts.toasts[0].id).toBeTruthy();
        expect(toasts.toasts[0].type).toEqual(payload.type);
        expect(toasts.toasts[0].message).toEqual(payload.message);
      });
    });

    describe('remove', () => {
      const id = 'randomIdStringTest';
      const store = createTestStore(preloadState({ toasts: [{ ...payload, id }] }));

      store.dispatch(toastsActions.remove({ id }));
      const { toasts } = store.getState();

      it(`should remove toast from the [toasts]`, () => {
        expect(toasts.toasts).toEqual([]);
      });
    });
  });

  describe('middleware', () => {
    const error = 'some test error';

    const store = createTestStore(preloadState());

    store.dispatch({ type: 'someTestActionRejected', payload: error });
    const { toasts } = store.getState();

    it('should push a new toast with correct data to [toasts]', () => {
      expect(toasts.toasts[0].id).toBeTruthy();
      expect(toasts.toasts[0].type).toEqual(ToastType.ERROR);
      expect(toasts.toasts[0].message).toEqual(error);
    });
  });
});
