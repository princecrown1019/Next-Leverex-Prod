import React, { FC } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  visible?: boolean;
};

export const LoadingComponent: FC<Props> = ({ className, visible }) => {
  return visible ? <div className={clsx(style.indicator, className)} /> : null;
};
