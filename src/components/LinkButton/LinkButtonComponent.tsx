import React, { forwardRef, useCallback, MouseEvent } from 'react';

import clsx from 'clsx';

import { LinkComponent, Props as LinkProps } from '~/components/Link/LinkComponent';
import { RippleComponent } from '~/components/Ripple/RippleComponent';

import style from './style.module.scss';

type Props = LinkProps & {
  transparent?: boolean;
  disabled?: boolean;
};

export const LinkButtonComponent = forwardRef<HTMLAnchorElement, Props>(
  ({ className, transparent, disabled, children, ...props }, ref) => {
    const classNames = [transparent && style.buttonLinkTransparent, disabled && style.buttonLinkDisabled];

    const handleClick = useCallback(
      (event: MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          event.preventDefault();
        }

        props.onClick?.(event);
      },
      [disabled]
    );

    return (
      <LinkComponent
        {...props}
        className={clsx(style.buttonLink, ...classNames, className)}
        onClick={handleClick}
        ref={ref}
      >
        {children}
        {!disabled && <RippleComponent />}
      </LinkComponent>
    );
  }
);
