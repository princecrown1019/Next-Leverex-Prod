import React, { FC, ReactNode, ReactText } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  children: ReactText | ReactNode[];
};

export const StaticPitchComponent: FC<Props> = ({ className, children }) => (
  <p className={clsx(style.staticPitch, className)}>{children}</p>
);
