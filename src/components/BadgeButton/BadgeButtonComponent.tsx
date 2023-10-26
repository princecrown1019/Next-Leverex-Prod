import React, { forwardRef, MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  disabled?: boolean;
  secondary?: boolean;
  children: ReactNode;
  name?: string;
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const BadgeButtonComponent = forwardRef<HTMLButtonElement, Props>(
  ({ className, secondary, disabled, name, children, handleClick }, ref) => (
    <ButtonComponent
      className={clsx(style.button, className, secondary ? style.buttonSecondary : style.buttonPrimary, 'group')}
      disabled={disabled}
      name={name}
      ref={ref}
      onClick={handleClick}
    >
      {children}
    </ButtonComponent>
  )
);
