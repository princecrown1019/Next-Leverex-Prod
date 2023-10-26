import React, { forwardRef, useMemo, ChangeEvent } from 'react';

import { Ticker } from '~/types/currencyTypes';
import { InputMaskComponent } from '~/components/InputMask/InputMaskComponent';

import style from './style.module.scss';

export type Props = {
  value: string;
  numericValue: number;
  label: string;
  ticker: Ticker;
  fixed: number;
  disabled?: boolean;
  error?: boolean;
  handleBlur?: () => void;
  handleFocus?: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const TradeInputComponent = forwardRef<HTMLInputElement, Props>(
  ({ value, numericValue, fixed, label, ticker, disabled, error, handleChange, handleBlur, handleFocus }, ref) => {
    const endAdornment = useMemo(() => <span className={style.tradeInputEndAdornment}>{ticker}</span>, [ticker]);

    const maskValue = useMemo(() => {
      return numericValue.toFixed(fixed);
    }, [disabled, numericValue, fixed]);

    return (
      <InputMaskComponent
        className={style.tradeInput}
        label={label}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        maskValue={maskValue}
        ref={ref}
        endAdornment={endAdornment}
        disabled={disabled}
        onChange={handleChange}
        error={error}
      />
    );
  }
);
