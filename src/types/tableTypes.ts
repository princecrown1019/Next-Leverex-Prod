export type TableHeadCell<T> = {
  sortable?: boolean;
  value?: null | boolean;
  label: string;
  accessor?: keyof T;
};
