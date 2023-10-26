export type FilterState<K extends Record<string, unknown>> = {
  label: string;
  key: keyof K;
  keyValue: string | number | boolean | (string | number | boolean)[];
  value: boolean;
};

export type FilterCriteria<T extends Record<string, unknown>> = {
  [K in FilterState<T>['key']]: unknown[];
};
