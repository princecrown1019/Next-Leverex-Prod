import React, { FC, ReactNode, useCallback } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  selected: boolean;
  current: boolean;
  disabled: boolean;
  value: number;
  inRange?: boolean;
  handleClick: (value: number) => void;
  children: ReactNode;
};

export const YearAndMonthPickerButtonComponent: FC<Props> = ({
  className,
  current,
  disabled,
  value,
  inRange,
  selected,
  children,
  handleClick
}) => {
  const selectedClassName = selected && style.yearMonthPickerButtonSelected;
  const currentClassName = current && style.yearMonthPickerButtonCurrent;
  const inRangeClassName = inRange && style.yearMonthPickerButtonInRange;

  const localHandleClick = useCallback(() => {
    handleClick(value);
  }, [value, handleClick]);

  return (
    <ButtonComponent
      className={clsx(style.yearMonthPickerButton, className, currentClassName, selectedClassName, inRangeClassName)}
      withoutRipple
      disabled={disabled}
      onClick={localHandleClick}
    >
      {children}
    </ButtonComponent>
  );
};
