import { FilterState, FilterCriteria } from '~/types/filterTypes';

export const getFilterCriteria = <T extends Record<string, unknown>>(state: FilterState<T>[]) => {
  // eslint-disable-next-line unicorn/no-array-reduce,unicorn/prefer-object-from-entries
  return state.reduce(
    (acc, c) => ({
      ...acc,
      [c.key]: [...(acc[c.key] ? acc[c.key] : []), ...(Array.isArray(c.keyValue) ? c.keyValue : [c.keyValue])]
    }),
    {} as FilterCriteria<T>
  );
};

export const filterArray = <T extends Record<string, unknown>>(array: T[], state: FilterState<T>[]) => {
  const filteredState = state.filter(({ value }) => value);
  if (!filteredState.length) return array;

  const criteria = getFilterCriteria(filteredState);

  return array.filter((value) => Object.entries(criteria).every(([key, val]) => val.includes(value[key])));
};
