import React, { forwardRef } from 'react';

import style from './style.module.scss';

export const OverviewChartComponent = forwardRef<HTMLDivElement>((_, ref) => (
  <div className={style.overviewChart} ref={ref} />
));
