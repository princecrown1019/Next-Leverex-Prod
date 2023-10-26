import React, { FC, MouseEvent, ReactNode, useMemo } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  valueClassName?: null | string;
  name?: string;
  disabled?: boolean;
  withoutWrapper?: boolean;
  children: ReactNode | ReactNode[];
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const TableCellComponent: FC<Props> = ({
  className,
  valueClassName,
  withoutWrapper,
  name,
  disabled,
  children,
  handleClick
}) => {
  const wrapper = useMemo(
    () =>
      handleClick ? (
        <ButtonComponent
          className={clsx(style.tableCellValue, valueClassName)}
          withoutRipple
          disabled={disabled}
          name={name}
          onClick={handleClick}
        >
          {children}
        </ButtonComponent>
      ) : (
        <span className={clsx(style.tableCellValue, valueClassName)}>{children}</span>
      ),
    [handleClick, disabled, name, children, valueClassName]
  );

  return <div className={clsx(style.tableCell, className)}>{withoutWrapper ? children : wrapper}</div>;
};
