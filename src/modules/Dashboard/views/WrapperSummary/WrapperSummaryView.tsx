import React, { FC, ReactNode } from 'react';

import { LoadingSocketWrapperComponent } from '~/components/LoadingSocketWrapper/LoadingSocketWrapperComponent';

import style from './style.module.scss';

export type Props = {
  loading: boolean;
  children: ReactNode | ReactNode[];
};

export const DashboardWrapperSummaryView: FC<Props> = ({ loading, children }) => (
  <LoadingSocketWrapperComponent className={style.dashboardWrapperSummary} visible={loading}>
    {children}
  </LoadingSocketWrapperComponent>
);
