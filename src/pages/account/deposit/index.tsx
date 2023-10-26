import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { DepositContainer } from '~/modules/Deposit/containers/Deposit/DepositContainer';
import { RecentDepositsContainer } from '~/modules/Deposit/containers/RecentDeposits/RecentDepositsContainer';
import { ExchangeContainer } from '~/modules/Deposit/containers/Exchange/ExchangeContainer';

import style from './style.module.scss';

const Deposit: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stablecoin deposit</title>

        <OpenGraphComponent
          title="Stablecoin deposit"
          description="Stablecoin deposit"
          img="/static/media/og-picture.jpeg"
        />
      </Head>

      <ProtectedLayout links={accountPagePaths}>
        <div className={style.deposit}>
          <div className={style.depositMain}>
            <div>
              <div className={style.depositHeadlineRow}>
                <ProtectedLayoutHeadlineComponent className={style.depositHeadline}>
                  Stablecoin deposit
                </ProtectedLayoutHeadlineComponent>
              </div>

              <DepositContainer className={style.depositContent} />
            </div>

            <div className={style.depositExchange}>
              <ProtectedLayoutHeadlineComponent className={style.depositHeadline}>
                Exchange funds
              </ProtectedLayoutHeadlineComponent>

              <ExchangeContainer />
            </div>
          </div>

          <RecentDepositsContainer className={style.depositOngoingTransactions} />
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(Deposit);
