import React, { forwardRef, ReactNode } from 'react';

import { DividerComponent } from '~/components/Divider/DividerComponent';
import { YearMonthDayPickerComponent } from '~/components/YearMonthDayPicker/YearMonthDayPickerComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  startDate: null | Date;
  endDate: null | Date;
  minDate?: null | Date;
  children?: ReactNode;
  handleStartChange?: (value: null | Date) => void;
  handleEndChange?: (value: null | Date) => void;
};

export const DateRangePickerComponent = forwardRef<HTMLDivElement, Props>(
  ({ className, children, minDate, startDate, endDate, handleStartChange, handleEndChange }, ref) => {
    return (
      <div className={className} ref={ref}>
        {children}
        <div className={style.dateRange}>
          <YearMonthDayPickerComponent
            className={style.dateRangeSide}
            value={startDate}
            maxDate={endDate}
            minDate={minDate}
            startDate={startDate}
            endDate={endDate}
            start
            handleChange={handleStartChange}
          />

          <DividerComponent className={style.dateRangeDivider} vertical />

          <YearMonthDayPickerComponent
            className={style.dateRangeSide}
            value={endDate}
            minDate={startDate || minDate}
            startDate={startDate}
            endDate={endDate}
            end
            handleChange={handleEndChange}
          />
        </div>
      </div>
    );
  }
);
