import * as textFormatService from './textFormatService';

describe('textFormatService', () => {
  describe('truncateText', () => {
    const text = '123sdf45g5fdg4g36wer67s4dc55ad6ggfd38fgd4gdg53';

    it('should return truncated text "123...g53"', () => {
      expect(textFormatService.truncateText(text, 3, 3)).toEqual('123...g53');
    });

    it('should return truncated text "123sdf45g5...g53"', () => {
      expect(textFormatService.truncateText(text, 10, 3)).toEqual('123sdf45g5...g53');
    });

    it('should return truncated text "...g53"', () => {
      expect(textFormatService.truncateText(text, 0, 3)).toEqual('...g53');
    });

    it('should return truncated text "123s..."', () => {
      expect(textFormatService.truncateText(text, 4, 0)).toEqual('123s...');
    });
  });
});
