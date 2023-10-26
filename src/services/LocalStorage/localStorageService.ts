export const setLocalStorageItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = <T>(key: string): null | T => {
  const value = localStorage.getItem(key);
  if (!value) return null;

  return JSON.parse(value);
};

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};
