import * as inputFormatService from './inputFormatService';

describe('inputFormatService', () => {
  describe('replacePrice', () => {
    it('should return formatted value', () => {
      expect(inputFormatService.replacePrice('2133')).toBe('2 133');
      expect(inputFormatService.replacePrice('21,330.00')).toBe('21 330.00');
    });
  });

  describe('replaceAmount', () => {
    it('should return formatted value', () => {
      expect(inputFormatService.replaceAmount('00', 8)).toBe('0.0');
      expect(inputFormatService.replaceAmount('.', 8)).toBe('0.');
      expect(inputFormatService.replaceAmount('21', 8)).toBe('21');
      expect(inputFormatService.replaceAmount('0.1', 8)).toBe('0.1');
      expect(inputFormatService.replaceAmount('0.121323235', 8)).toBe('0.12132323');
    });
  });
});
