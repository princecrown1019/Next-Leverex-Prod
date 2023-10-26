import * as uniqueService from './uniqueService';

const array = [
  {
    value: 'test1'
  },
  {
    value: 'test1'
  },
  {
    value: 'test2'
  },
  {
    value: 'test1'
  },
  {
    value: 'test3'
  },
  {
    value: 'test2'
  }
];

describe('uniqueService', () => {
  describe('makeItemsUnique', () => {
    const result = uniqueService.makeItemsUnique(array, 'value');

    it('should return an array with length "3"', () => {
      expect(result.length).toEqual(3);
    });

    it('should return an array with unique "value" key', () => {
      expect(result).toEqual([array[0], array[2], array[4]]);
    });
  });
});
