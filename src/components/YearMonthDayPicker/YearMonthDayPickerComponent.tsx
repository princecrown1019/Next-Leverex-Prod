import React, { FC, useCallback, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';

import { monthsShort } from '~/constants/datePickerConstants';
import { YearAndMonthPickerComponent } from '~/components/YearAndMonthPicker/YearAndMonthPickerComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { setDateRangeValues } from '~/services/DateRanges/dateRangesService';

import style from './style.module.scss';

export type Props = {
  className?: string;
  value: null | Date;
  start?: boolean;
  end?: boolean;
  minDate?: null | Date;
  maxDate?: null | Date;
  startDate?: null | Date;
  endDate?: null | Date;
  handleChange?: (value: null | Date) => void;
};

enum Tab {
  YEAR,
  MONTH,
  DAY
}

export const YearMonthDayPickerComponent: FC<Props> = ({
  className,
  value,
  minDate,
  start,
  end,
  startDate,
  endDate,
  handleChange,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [tabIdx, setTabIdx] = useState(Tab.YEAR);

  const time = useMemo(() => {
    if (start) return 0;
    if (end) return 59;

    return 0;
  }, [start, end]);

  const maxDate = useMemo(() => props.maxDate || new Date(), [props.maxDate]);

  const endYear = useMemo(() => endDate?.getFullYear() ?? null, [endDate]);
  const endMonth = useMemo(() => endDate?.getMonth() ?? null, [endDate]);
  const endDay = useMemo(() => endDate?.getDate() ?? null, [endDate]);

  const startYear = useMemo(() => startDate?.getFullYear() ?? null, [startDate]);
  const startMonth = useMemo(() => startDate?.getMonth() ?? null, [startDate]);
  const startDay = useMemo(() => startDate?.getDate() ?? null, [startDate]);

  const date = useMemo(() => value || selectedDate, [value, selectedDate]);
  const year = useMemo(() => date?.getFullYear() || null, [date]);
  const month = useMemo(() => date?.getMonth() ?? null, [date]);

  const headline = useMemo(() => {
    if (tabIdx === Tab.MONTH) return `Select month of ${year}`;
    if (tabIdx === Tab.DAY) return `Select day of ${monthsShort[month!]} ${year}`;

    return 'Select year';
  }, [tabIdx, year, month]);

  const changeDateAndTab = useCallback(
    (newDate: Date | null, tab?: Tab) => {
      if (!newDate) return;

      const nextDate = setDateRangeValues(newDate, !end);

      setSelectedDate(nextDate);
      handleChange?.(nextDate);

      if (typeof tab !== 'undefined') {
        setTabIdx(tab);
      }
    },
    [handleChange, end]
  );

  const handleYearChange = useCallback(
    (newYear: number) => {
      const newDate = date ? new Date(date.valueOf()) : new Date(newYear, 0, 1, time, time, time);
      newDate.setFullYear(newYear);
      newDate.setMonth(0);
      newDate.setDate(1);

      if (minDate && minDate.getFullYear() === newYear && minDate.getMonth() > 0) {
        newDate.setMonth(minDate.getMonth());
        newDate.setDate(minDate.getDate());
      }

      if (end && newYear === startYear) {
        newDate.setMonth(Math.max(0, startMonth || 0));

        if (startDay && startDay > 1) {
          newDate.setDate(startDay);
        }
      }

      if (start && newYear === endYear) {
        newDate.setMonth(Math.min(0, endMonth || 0));

        if (endDay && endDay > 1) {
          newDate.setDate(endDay);
        }
      }

      changeDateAndTab(newDate, Tab.MONTH);
    },
    [changeDateAndTab, date, startYear, endYear, startMonth, endMonth, startDay, endDay, time, minDate]
  );

  const handleMonthChange = useCallback(
    (newMonth: number) => {
      if (!date) return;

      const newDate = new Date(date.valueOf());
      newDate.setMonth(newMonth);
      newDate.setDate(1);

      if (minDate && minDate.getMonth() === newMonth) {
        newDate.setDate(minDate.getDate());
      }

      if (end && year === startYear && newMonth === startMonth && startDay && startDay > 1) {
        newDate.setDate(startDay);
      }

      if (start && year === endYear && newMonth === endMonth && endDay && endDay > 1) {
        newDate.setDate(endDay);
      }

      changeDateAndTab(newDate, Tab.DAY);
    },
    [
      changeDateAndTab,
      date,
      year,
      start,
      end,
      startYear,
      endYear,
      month,
      startMonth,
      endMonth,
      startDay,
      endDay,
      minDate
    ]
  );

  const handleDayChange = useCallback(
    (newDate: null | Date) => {
      if (!newDate) return;

      changeDateAndTab(newDate);
    },
    [changeDateAndTab]
  );

  const handleStartSideBackClick = useCallback(() => {
    setTabIdx((prevTabIdx) => prevTabIdx - 1);
  }, []);

  return (
    <div className={className}>
      <div className={style.yearMonthDayPickerHeader}>
        <ButtonComponent
          className={style.yearMonthDayPickerButtonBack}
          disabled={tabIdx === Tab.YEAR}
          withoutRipple
          onClick={handleStartSideBackClick}
        />
        <span className={style.yearMonthDayPickerHeadline}>{headline}</span>
      </div>
      {tabIdx <= 1 ? (
        <YearAndMonthPickerComponent
          className={style.yearMonthDayPickerBody}
          year={tabIdx === Tab.YEAR}
          month={tabIdx === Tab.MONTH}
          selected={date}
          start={start}
          end={end}
          min={minDate}
          startDate={startDate}
          endDate={endDate}
          handleMonthChange={handleMonthChange}
          handleYearChange={handleYearChange}
        />
      ) : (
        <DatePicker
          selected={date}
          onChange={handleDayChange}
          renderCustomHeader={() => null}
          open
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </div>
  );
};
