export const makeItemsUnique = <T>(values: T[], uniqueKey: keyof T) => {
  return [...new Map(values.map((value) => [value[uniqueKey], value])).values()];
};
