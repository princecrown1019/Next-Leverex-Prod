import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  children?: ReactNode | ReactNode[];
};

export const TradesAccordionColumnComponent: FC<Props> = ({ className, children }) => (
  <div className={clsx(style.positionsAccordionColumn, className)}>{children}</div>
);
