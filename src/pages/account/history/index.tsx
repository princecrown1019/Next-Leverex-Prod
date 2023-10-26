import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { HistoryContainer } from '~/modules/History/containers/History/HistoryContainer';

import style from './style.module.scss';

const History: NextPage = () => {
  return (
    <>
      <Head>
        <title>History</title>

        <OpenGraphComponent title="History" description="History" img="/static/media/og-picture.jpeg" />
      </Head>

      <ProtectedLayout links={accountPagePaths}>
        <div className={style.history}>
          <HistoryContainer />
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(History);
