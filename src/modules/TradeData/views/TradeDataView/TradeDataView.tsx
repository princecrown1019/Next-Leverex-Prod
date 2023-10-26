import React, { FC } from 'react';

import clsx from 'clsx';

import { TradeDataPositionsSummaryContainer } from '~/modules/TradeData/containers/PositionsSummary/PositionsSummaryContainer';
import { TradeDataLeverageContainer } from '~/modules/TradeData/containers/Leverage/LeverageContainer';
import { TradeDataAccountSummaryContainer } from '~/modules/TradeData/containers/AccountSummary/AccountSummaryContainer';
import { ProtectedWidgetContainer } from '~/modules/ProtectedWidget/containers/ProtectedWidget/ProtectedWidgetContainer';
import { LoadingSocketWrapperComponent } from '~/components/LoadingSocketWrapper/LoadingSocketWrapperComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  loggedIn: boolean;
};

export const TradeDataView: FC<Props> = ({ className, loggedIn }) => (
  <LoadingSocketWrapperComponent className={clsx(style.tradeData, loggedIn && style.tradeDataLoggedIn, className)}>
    <ProtectedWidgetContainer />

    <h3 className={style.tradeDataHeadline}>Trade data</h3>

    <TradeDataPositionsSummaryContainer />
    <TradeDataLeverageContainer />
    <div className={style.tradeDivider} />
    <TradeDataAccountSummaryContainer />
  </LoadingSocketWrapperComponent>
);
