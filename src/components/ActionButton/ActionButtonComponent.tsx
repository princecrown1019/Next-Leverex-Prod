import React, { ButtonHTMLAttributes, MouseEvent, ReactText, forwardRef, ReactNode } from 'react';

import clsx from 'clsx';

import { LoadingComponent } from '~/components/Loading/LoadingComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode | ReactText;
  transparent?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ActionButtonComponent = forwardRef<HTMLButtonElement, Props>(
  ({ className, transparent, loading, disabled, type, children, handleClick }, ref) => (
    <ButtonComponent
      className={clsx(style.button, transparent && style.buttonTransparent, className, loading && style.buttonLoading)}
      disabled={loading || disabled}
      type={type}
      onClick={handleClick}
      ref={ref}
    >
      <LoadingComponent className={style.indicator} visible={loading} />
      {children}
    </ButtonComponent>
  )
);
