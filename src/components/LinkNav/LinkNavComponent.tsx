import React, { AnchorHTMLAttributes, forwardRef, useMemo } from 'react';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import style from './style.module.scss';

export type Props = Omit<LinkProps, 'href'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href?: null | string;
    activeClassName?: string;
    isActive?: (pathname: string) => boolean;
  };

export const LinkNavComponent = forwardRef<HTMLAnchorElement, Props>(
  ({ className, activeClassName, prefetch, href, isActive, children, ...props }, ref) => {
    const { pathname } = useRouter();

    const active = useMemo(() => isActive?.(pathname) || href === pathname, [pathname]);

    return (
      <Link href={href || pathname} prefetch={prefetch}>
        <a {...props} className={clsx(style.link, className, active && activeClassName)} ref={ref}>
          {children}
        </a>
      </Link>
    );
  }
);
