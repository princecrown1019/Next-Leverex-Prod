import React, { forwardRef } from 'react';

import { LoadingWrapperComponent } from '~/components/LoadingWrapper/LoadingWrapperComponent';

import style from './style.module.scss';

type Props = {
  loading: boolean;
};

export const OverviewChartView = forwardRef<HTMLDivElement, Props>(({ loading }, ref) => (
  <>
    <LoadingWrapperComponent className={style.overviewChartLoading} visible={loading} />
    <div className={style.overviewChart} ref={ref} />
  </>
));
