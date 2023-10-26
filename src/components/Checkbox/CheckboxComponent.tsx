import React, { FC, useCallback } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { CheckboxCheckIcon } from '~/assets/Icons';

import style from './style.module.scss';

export type Props = {
  className?: string;
  value: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
  handleChange?: (value: boolean, name?: string) => void;
};

export const CheckboxComponent: FC<Props> = ({ className, value, id, name, disabled, handleChange }) => {
  const handleClick = useCallback(() => {
    if (disabled) return;

    handleChange?.(!value, name);
  }, [value, name, disabled, handleChange]);

  return (
    <ButtonComponent
      className={clsx(style.checkbox, className, value && style.checkboxChecked)}
      disabled={disabled}
      id={id}
      onClick={handleClick}
    >
      {value ? <CheckboxCheckIcon className={style.checkboxIcon} /> : null}
    </ButtonComponent>
  );
};
