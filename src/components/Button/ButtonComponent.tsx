import React, { ButtonHTMLAttributes, forwardRef } from 'react';

import clsx from 'clsx';

import { RippleComponent } from '~/components/Ripple/RippleComponent';

import style from './style.module.scss';

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  withoutRipple?: boolean;
};

export const ButtonComponent = forwardRef<HTMLButtonElement, Props>(
  ({ className, withoutRipple, children, ...props }, ref) => (
    <button {...props} className={clsx(style.button, className)} type={props.type || 'button'} ref={ref}>
      {children}
      {!withoutRipple && <RippleComponent disabled={props.disabled} />}
    </button>
  )
);
