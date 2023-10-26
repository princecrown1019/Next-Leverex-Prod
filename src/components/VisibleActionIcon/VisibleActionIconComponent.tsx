import React, { FC } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  visible: boolean;
};

export const VisibleActionIconComponent: FC<Props> = ({ className, visible }) => (
  <div className={clsx(style.visibleActionIcon, className)}>
    <span className={style.visibleActionIconSymbol}>{visible ? '-' : '+'}</span>
  </div>
);
