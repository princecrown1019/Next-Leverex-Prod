import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { StatementsContainer } from '~/modules/Statements/containers/Statements/StatementsContainer';

import style from './style.module.scss';

const Statements: NextPage = () => {
  return (
    <>
      <Head>
        <title>Statements</title>

        <OpenGraphComponent title="Statements" description="Statements" img="/static/media/og-picture.jpeg" />
      </Head>

      <ProtectedLayout links={accountPagePaths}>
        <div className={style.statements}>
          <ProtectedLayoutHeadlineComponent>Statements</ProtectedLayoutHeadlineComponent>

          <StatementsContainer className={style.statementsForm} />
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(Statements);
