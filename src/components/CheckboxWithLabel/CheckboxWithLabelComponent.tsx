import React, { FC, ReactNode, useCallback } from 'react';

import clsx from 'clsx';

import { CheckboxComponent } from '~/components/Checkbox/CheckboxComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  value: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
  children: ReactNode | ReactNode[];
  handleChange: (value: boolean, name?: string) => void;
};

export const CheckboxWithLabelComponent: FC<Props> = ({
  className,
  value,
  id,
  name,
  disabled,
  children,
  handleChange
}) => {
  const handleClick = useCallback(() => {
    if (disabled) return;

    handleChange(!value, name);
  }, [value, name, disabled]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
    <div className={clsx(style.checkboxWithLabel, className)} id={id} role="button" onClick={handleClick}>
      <CheckboxComponent className={style.checkboxWithLabelIcon} value={value} disabled />
      {children}
    </div>
  );
};
