import * as dateFormatService from './dateFormatService';

describe('dateFormatService', () => {
  const raw = '2022-03-18T16:06:35.946Z';
  const date = new Date(raw);
  const string = 'Fri Mar 18 2022 18:06:35 GMT+0200 (Eastern European Standard Time)';
  const local = '3/18/2022, 6:06:35 PM';
  const time = 1_647_619_595_946;

  describe('toMilliseconds', () => {
    it('should return the value multiplied by 1000', () => {
      const value = 1;

      expect(dateFormatService.toMilliseconds(value)).toBe(value * 1000);
    });
  });

  describe('toUTCStringTime', () => {
    it('should return the UTC time', () => {
      expect(dateFormatService.toUTCStringTime(date)).toBe('16:06:35');
      expect(dateFormatService.toUTCStringTime(raw)).toBe('16:06:35');
      expect(dateFormatService.toUTCStringTime(string)).toBe('16:06:35');
    });
  });

  describe('toUTCStringDate', () => {
    it('should return the UTC date in [yyyy-mm-dd] format', () => {
      expect(dateFormatService.toUTCStringDate(date)).toBe('2022-03-18');
      expect(dateFormatService.toUTCStringDate(raw)).toBe('2022-03-18');
      expect(dateFormatService.toUTCStringDate(string)).toBe('2022-03-18');
      expect(dateFormatService.toUTCStringDate(local)).toBe('2022-03-18');
      expect(dateFormatService.toUTCStringDate(time)).toBe('2022-03-18');
    });
  });

  describe('toISODate', () => {
    it('should return date in [yyyy-mm-dd] format', () => {
      expect(dateFormatService.toISODate(date)).toBe('2022-03-18');
      expect(dateFormatService.toISODate(raw)).toBe('2022-03-18');
      expect(dateFormatService.toISODate(string)).toBe('2022-03-18');
      expect(dateFormatService.toISODate(local)).toBe('2022-03-18');
      expect(dateFormatService.toISODate(time)).toBe('2022-03-18');
    });
  });

  describe('toISOFullDate', () => {
    it('should return time in [yyyy-mm-dd hh:mm:ss.mss] format', () => {
      expect(dateFormatService.toISOFullDate(date)).toBe('2022-03-18 16:06:35.946000');
    });
  });
});
