import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  children?: ReactNode | ReactNode[];
};

export const LadderView: FC<Props> = ({ className, children }) => (
  <form className={clsx(style.ladder, className)} autoComplete="off">
    {children}
  </form>
);
