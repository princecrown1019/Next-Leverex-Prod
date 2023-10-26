export const setDateRangeValues = (date: Date, start: boolean) => {
  date.setHours(start ? 0 : 23);
  date.setMinutes(start ? 0 : 59);
  date.setSeconds(start ? 0 : 59);
  date.setMilliseconds(start ? 0 : 999);

  return date;
};

export const getCurrentDayTimeRanges = () => {
  const startDate = new Date();
  const endDate = new Date();

  const start = setDateRangeValues(startDate, true);

  return [start, endDate];
};

export const getYesterdayTimeRanges = () => {
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(startDate.getDate() - 1);
  const start = setDateRangeValues(startDate, true);

  endDate.setDate(endDate.getDate() - 1);
  const end = setDateRangeValues(endDate, false);

  return [start, end];
};

export const getLast7DaysTimeRanges = () => {
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(startDate.getDate() - 7);
  const start = setDateRangeValues(startDate, true);

  const end = setDateRangeValues(endDate, false);

  return [start, end];
};

export const getThisMonthTimeRanges = () => {
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(1);
  const start = setDateRangeValues(startDate, true);

  return [start, endDate];
};

export const getThisYearTimeRanges = () => {
  const startDate = new Date();
  const endDate = new Date();

  startDate.setMonth(0);
  startDate.setDate(1);
  const start = setDateRangeValues(startDate, true);

  return [start, endDate];
};
