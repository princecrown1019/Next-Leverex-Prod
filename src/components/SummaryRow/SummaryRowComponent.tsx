import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  label: string;
  children: ReactNode;
  customChild?: boolean;
};

export const SummaryRowComponent: FC<Props> = ({ className, label, customChild, children }) => (
  <div className={clsx(style.summaryRow, className)}>
    <p className={style.summaryRowLabel}>{label}</p>
    {customChild ? children : <p className={style.summaryRowValue}>{children}</p>}
  </div>
);
