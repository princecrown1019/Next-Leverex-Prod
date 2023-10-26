import { FilterState } from '~/types/filterTypes';

import * as filterService from './filterService';

const array = [
  {
    value: 'test1',
    amount: 20
  },
  {
    value: 'test2',
    amount: 10
  },
  {
    value: 'test3',
    amount: 100
  }
];

const state: FilterState<typeof array[0]>[] = [
  {
    value: false,
    label: 'Value',
    key: 'value',
    keyValue: 'test1'
  },
  {
    value: false,
    label: 'Value',
    key: 'value',
    keyValue: 'test2'
  },
  {
    value: false,
    label: 'Amount',
    key: 'amount',
    keyValue: [10, 20]
  },
  {
    value: false,
    label: 'Wrong amount',
    key: 'amount',
    keyValue: 30
  }
];

const getState = (idxs: number[]) => {
  return state.map((value, idx) => (idxs.includes(idx) ? { ...value, value: true } : value));
};

describe('filterService', () => {
  describe('filterArray', () => {
    describe('applying the "test1" value filter', () => {
      const result = filterService.filterArray(array, getState([0]));

      it('should return 1 item in array', () => {
        expect(result.length).toEqual(1);
      });

      it('should return 1 item with the "test1" value', () => {
        expect(result).toEqual([array[0]]);
      });
    });

    describe('applying the "test1" and "test2" value filters', () => {
      const result = filterService.filterArray(array, getState([0, 1]));

      it('should return 2 item in array', () => {
        expect(result.length).toEqual(2);
      });

      it('should return 1 item with the "test1" value', () => {
        expect(result).toEqual([array[0], array[1]]);
      });
    });

    describe('applying the "[10, 20]" amount filter', () => {
      const result = filterService.filterArray(array, getState([2]));

      it('should return 2 items in array', () => {
        expect(result.length).toEqual(2);
      });

      it('should return 2 items with the "10" and "20" amounts', () => {
        expect(result).toEqual([array[0], array[1]]);
      });
    });

    describe('applying the "30" amount filter', () => {
      const result = filterService.filterArray(array, getState([3]));

      it('should return an empty array', () => {
        expect(result.length).toEqual(0);
      });
    });
  });

  describe('getFilterCriteria', () => {
    const criteria = filterService.getFilterCriteria(getState([0]));

    it('should return a valid criteria object', () => {
      expect(criteria.value).toEqual(['test1', 'test2']);
      expect(criteria.amount).toEqual([10, 20, 30]);
    });
  });
});
