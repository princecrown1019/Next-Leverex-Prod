import React, { forwardRef, ReactNode } from 'react';

import clsx from 'clsx';

import { LabelComponent } from '~/components/Label/LabelComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  label: string;
  children: ReactNode | ReactNode[];
};

export const StatsItemComponent = forwardRef<HTMLSpanElement, Props>(({ className, label, children }, ref) => (
  <div className={clsx(style.statsItem, className)}>
    <LabelComponent>{label}</LabelComponent>
    <span className={style.statsItemValue} ref={ref}>
      {children}
    </span>
  </div>
));
