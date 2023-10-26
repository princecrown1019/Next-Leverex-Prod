import { fixDecimals, separate } from '~/services/NumberFormat/numberFormatService';

const DOT = '.';

export const replacePrice = (value: string, decimals = 2) => {
  const formattedValue = value.trim().replace(/[ ,]/g, '');
  if (!formattedValue) return formattedValue;
  if (formattedValue.endsWith(DOT)) return value;

  const [, afterDot] = formattedValue.split(DOT);
  const fixedValue = fixDecimals(formattedValue, Math.min(afterDot?.length || 0, decimals));

  return separate(fixedValue);
};

export const replaceAmount = (value: string, decimals: number) => {
  let formattedValue = value.trim().replace(/,/g, '.');
  if (!formattedValue) return formattedValue;
  if (formattedValue === '.') return '0.';
  if (formattedValue.endsWith(DOT)) return formattedValue;
  if (formattedValue === '00') return '0.0';

  if (/(^0)(\d)$/.test(formattedValue)) {
    formattedValue = formattedValue.replace(/(^0)(\d*$)/, '0.$2');
  }

  const [, afterDot] = formattedValue.split(DOT);
  return fixDecimals(formattedValue, Math.min(afterDot?.length || 0, decimals));
};
