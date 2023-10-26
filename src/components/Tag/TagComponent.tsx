import React, { FC, ReactText } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  children: ReactText;
};

export const TagComponent: FC<Props> = ({ className, children }) => (
  <span className={clsx(style.tag, className)}>{children}</span>
);
