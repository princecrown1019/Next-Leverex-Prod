import React, { FC, ReactNode, useCallback } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { SwitcherComponent, Props as SwitcherProps } from '~/components/Switcher/SwitcherComponent';

import style from './style.module.scss';

export type Props = SwitcherProps & {
  className?: string;
  title: string;
  description?: string;
  children?: ReactNode | ReactNode[];
};

export const SwitchableRowComponent: FC<Props> = ({
  className,
  name,
  disabled,
  handleChange,
  description,
  title,
  active,
  children
}) => {
  const handleClick = useCallback(() => {
    if (disabled) return;

    handleChange?.(!active, name);
  }, [active, name, disabled, handleChange]);

  return (
    <ButtonComponent className={clsx(style.switchableRow, className)} onClick={handleClick} withoutRipple>
      <div className={style.switchableRowContent}>
        <h6 className={style.switchableRowTitle}>{title}</h6>
        {description && <p className={style.switchableRowDescription}>{description}</p>}
        {children}
      </div>

      <SwitcherComponent active={active} />
    </ButtonComponent>
  );
};
