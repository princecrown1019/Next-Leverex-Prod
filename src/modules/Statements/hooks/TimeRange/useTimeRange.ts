import { useCallback, useMemo, useState } from 'react';

import { StatementRange } from '~/types/statemetsTypes';
import {
  getCurrentDayTimeRanges,
  getLast7DaysTimeRanges,
  getThisMonthTimeRanges,
  getThisYearTimeRanges,
  getYesterdayTimeRanges
} from '~/services/DateRanges/dateRangesService';
import { toISODate } from '~/services/DateFormat/dateFormatService';

const ranges = {
  [StatementRange.TODAY]: getCurrentDayTimeRanges,
  [StatementRange.YESTERDAY]: getYesterdayTimeRanges,
  [StatementRange.LAST_7_DAYS]: getLast7DaysTimeRanges,
  [StatementRange.THIS_MONTH]: getThisMonthTimeRanges,
  [StatementRange.THIS_YEAR]: getThisYearTimeRanges,
  [StatementRange.CUSTOM]: () => []
};

export const useStatementTimeRange = (minDate?: null | Date) => {
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [endDate, setEndDate] = useState<null | Date>(null);

  const dateRange = useMemo(() => {
    if (!startDate && !endDate) return '';
    if (startDate && !endDate) return toISODate(startDate);

    return `${toISODate(startDate!)} - ${toISODate(endDate!)}`;
  }, [startDate, endDate]);

  const resetTimeRange = useCallback(() => {
    setStartDate(minDate || null);
    setEndDate(null);
  }, [minDate]);

  const getTimeRange = useCallback(
    (range: StatementRange) => {
      return range === StatementRange.CUSTOM ? [startDate, endDate] : ranges[range]();
    },
    [startDate, endDate]
  );

  const setTimeRange = useCallback(
    (range: StatementRange) => {
      if (range === StatementRange.CUSTOM) {
        resetTimeRange();
      } else {
        const [start, end] = getTimeRange(range);

        setStartDate(start || minDate || null);
        setEndDate(end);
      }
    },
    [minDate]
  );

  return {
    dateRange,
    startDate,
    endDate,
    setTimeRange,
    resetTimeRange,
    getTimeRange,
    setStartDate,
    setEndDate
  };
};
