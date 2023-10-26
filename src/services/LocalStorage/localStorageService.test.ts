import * as localStorageService from './localStorageService';

describe('localStorageService', () => {
  const key = 'test key';
  const payload = { test: 'test payload', test2: 'test 2 payload' };

  describe('setLocalStorageItem', () => {
    jest.spyOn(window.localStorage, 'setItem');

    localStorageService.setLocalStorageItem(key, payload);

    it('should be called with correct value', () => {
      expect(localStorage.setItem).toBeCalledWith(key, JSON.stringify(payload));
    });
  });

  describe('getLocalStorageItem', () => {
    jest.spyOn(window.localStorage, 'getItem');

    localStorageService.setLocalStorageItem(key, payload);

    describe('sending the key which storage contains', () => {
      const value = localStorageService.getLocalStorageItem(key);

      it('should be called with correct value', () => {
        expect(localStorage.getItem).toBeCalledWith(key);
      });

      it('the value should taken from the store', () => {
        expect(value).toEqual(payload);
      });
    });

    describe('sending the key which storage does not contain', () => {
      const value = localStorageService.getLocalStorageItem('the wrong key');

      it('should return "null "if the storage do not contain the key', () => {
        expect(value).toEqual(null);
      });
    });
  });

  describe('removeLocalStorageItem', () => {
    jest.spyOn(window.localStorage, 'removeItem');

    localStorageService.setLocalStorageItem(key, payload);
    localStorageService.removeLocalStorageItem(key);

    it('should be called with correct value', () => {
      expect(localStorage.removeItem).toBeCalledWith(key);
    });

    it('should nuked from the storage', () => {
      expect(localStorage.getItem(key)).toBeFalsy();
    });
  });
});
