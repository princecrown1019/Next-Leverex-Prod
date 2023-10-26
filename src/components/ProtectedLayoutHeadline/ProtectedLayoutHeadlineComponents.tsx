import React, { FC, ReactText } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  children: ReactText;
};

export const ProtectedLayoutHeadlineComponent: FC<Props> = ({ className, children }) => (
  <h2 className={clsx(style.protectedLayoutHeadline, className)}>{children}</h2>
);
