import { padNumber } from '~/services/NumberFormat/numberFormatService';

const LOCALE = 'en-gb';

export const toMilliseconds = (value: number) => value * 1000;
export const toSeconds = (value: number) => value / 1000;
export const toTimestamp = (value: string) => new Date(value).getTime();

export const toISODate = (value: string | number | Date) => {
  const date = value instanceof Date ? value : new Date(value);

  return date.toLocaleDateString('en-CA');
};

export const checkDatesForSameDays = (dateOne: number | Date, dateTwo: number | Date) => {
  const one = dateOne instanceof Date ? dateOne : new Date(dateOne);
  const two = dateTwo instanceof Date ? dateTwo : new Date(dateTwo);

  return (
    one.getFullYear() === two.getFullYear() && one.getMonth() === two.getMonth() && one.getDate() === two.getDate()
  );
};

export const toTime = (value: number) => {
  // WARNING: timestamps come in seconds from the API.
  return new Date(toMilliseconds(value)).toLocaleTimeString('sw');
};

export const toUTCStringDate = (value: string | number | Date) => {
  const date = value instanceof Date ? value : new Date(value);

  const y = date.getUTCFullYear();
  const m = padNumber(date.getUTCMonth() + 1);
  const d = padNumber(date.getUTCDate());

  return `${y}-${m}-${d}`;
};

export const toUTCStringTime = (value: string | number | Date) => {
  const date = value instanceof Date ? value : new Date(value);

  const h = padNumber(date.getUTCHours());
  const m = padNumber(date.getUTCMinutes());
  const s = padNumber(date.getUTCSeconds());

  return `${h}:${m}:${s}`;
};

export const toUTCTime = (value: string | number | Date) => {
  const date = value instanceof Date ? value : new Date(value);

  return date.getTime() - date.getTimezoneOffset() * 60 * 1000;
};

export const toISOFullDate = (value = new Date()) => {
  const date = toUTCStringDate(value);
  const time = toUTCStringTime(value);

  const ms = (value.getUTCMilliseconds() * 100_000).toString().slice(0, 6);

  return `${date} ${time}.${ms}`;
};

export const toSlashSeparatedDate = (value = new Date()) => {
  return value.toLocaleDateString(LOCALE);
};

export const toSlashSeparatedTime = (value = new Date()) => {
  return value.toLocaleTimeString(LOCALE);
};

export const toSlashSeparatedFullDate = (value = new Date()) => {
  return `${toSlashSeparatedDate(value)} ${toSlashSeparatedTime(value)}`;
};
