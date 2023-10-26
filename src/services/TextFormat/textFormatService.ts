const SEPARATOR = '...';

export const truncateText = (value: string, startCharts: number, endCharts: number, separator = SEPARATOR) => {
  const firstHalf = value.slice(0, startCharts);
  const secondHalf = value.slice(Math.max(0, value.length - endCharts));

  return `${firstHalf}${separator}${secondHalf}`;
};
