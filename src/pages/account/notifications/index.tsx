import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { NotificationsContainer } from '~/modules/Notifications/containers/Notifications/NotificationsContainer';

import style from './style.module.scss';

const Notifications: NextPage = () => {
  return (
    <>
      <Head>
        <title>Notifications</title>

        <OpenGraphComponent title="Notifications" description="Notifications" img="/static/media/og-picture.jpeg" />
      </Head>

      <ProtectedLayout links={accountPagePaths}>
        <div className={style.notifications}>
          <ProtectedLayoutHeadlineComponent>Notifications</ProtectedLayoutHeadlineComponent>
          <p className={style.notificationsPitch}>
            In order to receive desktop notifications you need to allow <strong>{window?.location.host}</strong> to send
            you notifications through your browser. To do that: 1. Click on the lock sign on the left hand side of your
            address bar 2. Use the switcher for Notifications to turn it on.
            <br />
            <br />
            Furthermore, make sure that your system allows your browser to send desktop notifications, otherwise Leverex
            will be able to send just in-app notifications.
          </p>

          <NotificationsContainer className={style.notificationsContainer} />
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(Notifications);
