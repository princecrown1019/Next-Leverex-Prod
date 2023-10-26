import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { WithdrawContainer } from '~/modules/Withdraw/containers/Withdraw/WithdrawContainer';
import { RecentWithdrawalsContainer } from '~/modules/Withdraw/containers/RecentWithdrawals/RecentWithdrawalsContainer';

import style from './style.module.scss';

const Withdraw: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stablecoin withdrawal</title>

        <OpenGraphComponent
          title="Stablecoin withdrawal"
          description="Stablecoin withdrawal"
          img="/static/media/og-picture.jpeg"
        />
      </Head>

      <ProtectedLayout links={accountPagePaths}>
        <div className={style.withdraw}>
          <div className={style.withdrawMain}>
            <ProtectedLayoutHeadlineComponent>Stablecoin withdrawal</ProtectedLayoutHeadlineComponent>

            <WithdrawContainer className={style.withdrawForm} />
          </div>

          <RecentWithdrawalsContainer className={style.withdrawOngoingTransactions} />
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(Withdraw);
