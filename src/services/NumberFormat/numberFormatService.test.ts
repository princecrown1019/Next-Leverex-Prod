import * as numberFormatService from './numberFormatService';

describe('numberFormatService', () => {
  describe('toNumber', () => {
    it('should return a numeric value', () => {
      expect(numberFormatService.toNumber('221 023.3')).toBe(221_023.3);
      expect(numberFormatService.toNumber('221 023 233.32')).toBe(221_023_233.32);
      expect(numberFormatService.toNumber('0.332131231')).toBe(0.332_131_231);
    });
  });

  describe('padNumber', () => {
    it('should return a padded value', () => {
      expect(numberFormatService.padNumber(-1)).toBe('01');
      expect(numberFormatService.padNumber(1)).toBe('01');
      expect(numberFormatService.padNumber(2)).toBe('02');
      expect(numberFormatService.padNumber(3)).toBe('03');
      expect(numberFormatService.padNumber(10)).toBe('10');
      expect(numberFormatService.padNumber(11)).toBe('11');
    });
  });

  describe('removeMinus', () => {
    it('should return the value without a minus', () => {
      expect(numberFormatService.removeMinus(1)).toBe('1');
      expect(numberFormatService.removeMinus(-2)).toBe('2');
      expect(numberFormatService.removeMinus(-213)).toBe('213');
      expect(numberFormatService.removeMinus('-324')).toBe('324');
      expect(numberFormatService.removeMinus(4325)).toBe('4325');
      expect(numberFormatService.removeMinus('564')).toBe('564');
    });
  });

  describe('separate', () => {
    it('should return the value separated with " "', () => {
      expect(numberFormatService.separate(-2133)).toBe('-2 133');
      expect(numberFormatService.separate(2133)).toBe('2 133');
      expect(numberFormatService.separate('-32445')).toBe('-32 445');
      expect(numberFormatService.separate(32_445)).toBe('32 445');
      expect(numberFormatService.separate(32_445.4)).toBe('32 445.4');
    });

    it("shouldn't separate the value", () => {
      expect(numberFormatService.separate(0.432_132_132)).toBe('0.432132132');
    });

    it('should return the value separated with ","', () => {
      expect(numberFormatService.separate(-2133, ',')).toBe('-2,133');
      expect(numberFormatService.separate(2133, ',')).toBe('2,133');
      expect(numberFormatService.separate('-32445', ',')).toBe('-32,445');
      expect(numberFormatService.separate(32_445, ',')).toBe('32,445');
      expect(numberFormatService.separate(32_445.4, ',')).toBe('32,445.4');
    });
  });

  describe('separateAndFix', () => {
    it('should return a fixed value separated with " "', () => {
      expect(numberFormatService.separateAndFix(-2133)).toBe('-2 133.00');
      expect(numberFormatService.separateAndFix(2133)).toBe('2 133.00');
      expect(numberFormatService.separateAndFix('-32445')).toBe('-32 445.00');
      expect(numberFormatService.separateAndFix(32_445)).toBe('32 445.00');
      expect(numberFormatService.separateAndFix(32_445.4)).toBe('32 445.40');
      expect(numberFormatService.separateAndFix(32_445.443_243_243_24)).toBe('32 445.44');
      expect(numberFormatService.separateAndFix(32_445.443_243_243_24, 5)).toBe('32 445.44324');
    });
  });

  describe('fixDecimals', () => {
    it('should return a fixed value', () => {
      expect(numberFormatService.fixDecimals(-2133)).toBe('-2133.00');
      expect(numberFormatService.fixDecimals(2133)).toBe('2133.00');
      expect(numberFormatService.fixDecimals('-32445.545', 5)).toBe('-32445.54500');
      expect(numberFormatService.fixDecimals(32_445)).toBe('32445.00');
      expect(numberFormatService.fixDecimals(32_445.4)).toBe('32445.40');
      expect(numberFormatService.fixDecimals(32_445.443_243_243_24)).toBe('32445.44');
      expect(numberFormatService.fixDecimals(0.000_004_332_4, 3)).toBe('0.000');
      expect(numberFormatService.fixDecimals('0.0000000034', 8)).toBe('0.00000000');
      expect(numberFormatService.fixDecimals('-0.0000000034', 8)).toBe('0.00000000');
      expect(numberFormatService.fixDecimals('-1e-8', 8)).toBe('-0.00000001');
      expect(numberFormatService.fixDecimals('1e-8', 8)).toBe('0.00000001');
      expect(numberFormatService.fixDecimals('-1e-9', 8)).toBe('0.00000000');
      expect(numberFormatService.fixDecimals('1e-9', 8)).toBe('0.00000000');
    });
  });
});
