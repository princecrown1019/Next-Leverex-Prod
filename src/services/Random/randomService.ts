export const generateRandomString = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

export const generateListKey = (
  value: string | number,
  secondValue?: string | number,
  thirdValue?: string | number
) => {
  return encodeURI([value, secondValue, thirdValue].join(','));
};
