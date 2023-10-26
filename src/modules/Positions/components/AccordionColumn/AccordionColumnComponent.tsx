import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  cancel?: boolean;
  children?: ReactNode | ReactNode[];
};

export const PositionsAccordionColumnComponent: FC<Props> = ({ className, cancel, children }) => (
  <div className={clsx(style.positionsAccordionColumn, cancel && style.positionsAccordionColumnCancel, className)}>
    {children}
  </div>
);
