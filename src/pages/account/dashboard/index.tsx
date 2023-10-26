import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { DashboardProductSummaryContainer } from '~/modules/Dashboard/containers/ProductSummary/ProductSummaryContainer';
import { DashboardWrapperSummaryContainer } from '~/modules/Dashboard/containers/WrapperSummary/WrapperSummaryContainer';
import { DashboardProfitLossSummaryContainer } from '~/modules/Dashboard/containers/ProfitLossSummary/ProfitLossSummaryContainer';
import { DashboardBalancesSummaryContainer } from '~/modules/Dashboard/containers/BalancesSummary/BalancesSummaryContainer';
import { DashboardTransactionsSummaryContainer } from '~/modules/Dashboard/containers/TransactionsSummary/TransactionsSummaryContainer';
import { PositionsContainer } from '~/modules/Positions/containers/Positions/PositionsContainer';

import style from './style.module.scss';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>

        <OpenGraphComponent title="Dashboard" description="Dashboard" img="/static/media/og-picture.jpeg" />
      </Head>

      <ProtectedLayout links={accountPagePaths} withoutBackground>
        <div className={style.dashboard}>
          <div className={style.dashboardRow}>
            <DashboardProductSummaryContainer className={style.dashboardProductSummary} />

            <DashboardWrapperSummaryContainer>
              <DashboardBalancesSummaryContainer className={style.dashboardBalancesSummary} />
              <DashboardTransactionsSummaryContainer className={style.dashboardTransactionsSummary} />
            </DashboardWrapperSummaryContainer>
          </div>
          <DashboardProfitLossSummaryContainer className={style.dashboardProfitLossSummary} />
          <PositionsContainer className={style.dashboardOpenPositions} rounded />
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(Dashboard);
