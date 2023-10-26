import React, { forwardRef } from 'react';

import clsx from 'clsx';

import { LinkNavComponent, Props as LinkProps } from '~/components/LinkNav/LinkNavComponent';

import style from './style.module.scss';

type Props = LinkProps & {
  wrapperClassName?: string;
};

export const HeaderLinkComponent = forwardRef<HTMLAnchorElement, Props>(
  ({ className, wrapperClassName, children, ...props }, ref) => (
    <li className={clsx(style.headerLinkListItem, wrapperClassName, 'tw-group')}>
      <LinkNavComponent {...props} className={clsx(style.headerLink, className)} ref={ref}>
        {children}
      </LinkNavComponent>
    </li>
  )
);
