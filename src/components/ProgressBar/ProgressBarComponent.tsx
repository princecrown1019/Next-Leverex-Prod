import React, { forwardRef } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  trackClassName?: string;
  value?: number;
};

export const ProgressBarComponent = forwardRef<HTMLDivElement, Props>(({ className, trackClassName, value }, ref) => (
  <div className={clsx(style.progressBar, className)}>
    <div
      className={clsx(style.progressBarRunningTrack, trackClassName)}
      style={value ? { width: `${value}%` } : {}}
      ref={ref}
    />
  </div>
));
