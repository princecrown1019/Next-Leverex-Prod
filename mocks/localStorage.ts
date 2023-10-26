export const localStorageMock = ((): Omit<Storage, 'length' | 'key'> => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => {
      return store[key];
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});
