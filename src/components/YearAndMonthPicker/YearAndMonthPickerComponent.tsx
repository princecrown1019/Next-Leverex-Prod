import React, { FC, useCallback, useMemo } from 'react';

import clsx from 'clsx';

import { monthsShort } from '~/constants/datePickerConstants';
import { YearAndMonthPickerButtonComponent } from '~/components/YearAndMonthPickerButton/YearAndMonthPickerButtonComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  year?: boolean;
  month?: boolean;
  startDate?: Date | null;
  min?: Date | null;
  max?: Date | null;
  start?: boolean;
  end?: boolean;
  selected?: Date | null;
  endDate?: Date | null;
  handleMonthChange: (month: number) => void;
  handleYearChange: (year: number) => void;
};

export const YearAndMonthPickerComponent: FC<Props> = ({
  className,
  year,
  month,
  endDate,
  min,
  start,
  end,
  startDate,
  handleMonthChange,
  handleYearChange,
  selected
}) => {
  const selectedYear = useMemo(() => selected?.getFullYear() || null, [selected]);

  const currentDate = useMemo(() => new Date(), []);
  const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
  const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);

  const minDate = useMemo(
    () => (Number(startDate?.getTime()) >= Number(min?.getTime()) ? startDate : min),
    [startDate, min]
  );
  const minYear = useMemo(() => minDate?.getFullYear() ?? null, [minDate]);
  const minMonth = useMemo(() => {
    if (!minDate) return 0;

    return minYear === selectedYear ? minDate.getMonth() : 0;
  }, [minDate, minYear, selectedYear]);

  const maxYear = useMemo(() => endDate?.getFullYear() ?? null, [endDate]);
  const maxMonth = useMemo(() => {
    if (!endDate) return 100;

    return maxYear === selectedYear ? endDate.getMonth() : 100;
  }, [endDate, maxYear, selectedYear]);

  const years = useMemo(() => {
    const diff = currentYear - 15;

    return Array.from({ length: 24 }).map((_, idx) => idx + diff + 1);
  }, [currentYear]);

  const months = useMemo(() => {
    if (!selectedYear) return [];

    return Array.from({ length: 12 }).map((_, idx) => new Date(selectedYear, idx, 1));
  }, [selectedYear]);

  const getYearProps = useCallback(
    (value: number) => {
      let disabled = false;

      if (start) {
        disabled = (!!maxYear && value > maxYear) || (!!minYear && value < minYear) || value > currentYear;
      }

      if (end) {
        disabled = (!!minYear && value < minYear) || value > currentYear;
      }

      const inRange = (maxYear ? value <= maxYear : undefined) && (minYear ? value >= minYear : undefined);
      const current = value === currentYear;
      const active = maxYear === value || minYear === value;

      return { disabled, inRange, current, value, selected: active };
    },
    [start, end, maxYear, minYear, currentYear]
  );

  const getMonthProps = useCallback(
    (value: Date, monthValue: number) => {
      let disabled = false;

      if (start) {
        disabled =
          (selectedYear === currentYear && monthValue > currentMonth) ||
          (!!minMonth && monthValue < minMonth) ||
          monthValue > maxMonth;
      }

      if (end) {
        disabled = (selectedYear === currentYear && monthValue > currentMonth) || monthValue < minMonth;
      }

      const inRange = (startDate ? value >= startDate : undefined) && (endDate ? value <= endDate : undefined);
      const current = currentYear === selectedYear && monthValue === currentMonth;
      const active = monthValue === maxMonth || monthValue === minMonth;

      return { inRange, disabled, current, value: monthValue, selected: active };
    },
    [selectedYear, currentYear, currentMonth, maxMonth, minMonth, startDate, endDate]
  );

  return (
    <div className={clsx(style.yearMonthPicker, className)}>
      {year && (
        <div className={style.yearMonthPickerList}>
          {years.map((value) => (
            <YearAndMonthPickerButtonComponent
              className={style.yearMonthPickerButtonYear}
              key={value}
              handleClick={handleYearChange}
              {...getYearProps(value)}
            >
              {value}
            </YearAndMonthPickerButtonComponent>
          ))}
        </div>
      )}
      {month && (
        <div className={style.yearMonthPickerList}>
          {months.map((value, idx) => (
            <YearAndMonthPickerButtonComponent
              className={style.yearMonthPickerButtonMonth}
              key={idx}
              handleClick={handleMonthChange}
              {...getMonthProps(value, idx)}
            >
              {monthsShort[idx]}
            </YearAndMonthPickerButtonComponent>
          ))}
        </div>
      )}
    </div>
  );
};
