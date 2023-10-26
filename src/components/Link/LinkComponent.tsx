import React, { AnchorHTMLAttributes, forwardRef } from 'react';

import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';

import style from './style.module.scss';

export type Props = Omit<LinkProps, 'href'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href?: null | string;
  };

export const LinkComponent = forwardRef<HTMLAnchorElement, Props>(
  ({ className, prefetch, href, children, ...props }, ref) => (
    <Link href={href || ''} prefetch={prefetch}>
      <a {...props} className={clsx(style.link, className)} ref={ref}>
        {children}
      </a>
    </Link>
  )
);
