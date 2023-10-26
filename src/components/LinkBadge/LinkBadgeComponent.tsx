import React, { FC } from 'react';

import clsx from 'clsx';

import { LinkComponent, Props as LinkProps } from '~/components/Link/LinkComponent';

import style from './style.module.scss';

export const LinkBadgeComponent: FC<LinkProps> = ({ className, children, ...props }) => (
  <LinkComponent className={clsx(style.linkBadge, className)} {...props}>
    {children}
  </LinkComponent>
);
