const SEPARATOR = ' ';
const DOT = '.';
const FIXED = 2;
const LOCALE = 'en-gb';

export const removeMinus = (value: number | string) => value.toString().replace(/^-/, '');

export const padNumber = (value: number) => {
  const absValue = Math.abs(value);

  return `${absValue < 10 ? '0' : ''}${absValue}`;
};

export const toNumber = (value: string) => Number(value.replace(new RegExp(SEPARATOR, 'g'), ''));

export const fixDecimals = (value: string | number, decimals = FIXED) => {
  const parts = Intl.NumberFormat(LOCALE, {
    style: 'decimal',
    useGrouping: false,
    minimumFractionDigits: decimals,
    maximumFractionDigits: 16
  })
    .format(Number(value))
    .split('.');

  if (parts[1]?.length > decimals) {
    parts[1] = parts[1]?.slice(0, decimals);
  }

  if (/^-0$/.test(parts[0]) && !Number(parts[1])) {
    parts[0] = removeMinus(parts[0]);
  }

  return parts.join(DOT);
};

export const separate = (value: string | number, separator: string = SEPARATOR) => {
  const string = typeof value === 'number' ? value.toString() : value;
  const replaced = string.replace(separator, '');

  const parts = replaced.split(DOT);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return parts.join(DOT);
};

export const separateAndFix = (value: string | number, decimals = FIXED) => {
  const fixedValue = fixDecimals(value, decimals);

  return separate(fixedValue);
};
