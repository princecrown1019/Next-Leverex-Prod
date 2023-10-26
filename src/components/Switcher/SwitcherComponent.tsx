import React, { FC, useCallback } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  active: null | boolean;
  name?: string;
  disabled?: boolean;
  handleChange?: (value: boolean, name?: string) => void;
};

export const SwitcherComponent: FC<Props> = ({ className, active, name, disabled, handleChange }) => {
  const handleClick = useCallback(() => {
    if (disabled) return;

    handleChange?.(!active, name);
  }, [active, name, disabled, handleChange]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
    <div
      className={clsx(style.switcher, className, active && style.switcherActive)}
      role="button"
      onClick={handleClick}
    >
      <div className={style.switcherThumb} />
    </div>
  );
};
