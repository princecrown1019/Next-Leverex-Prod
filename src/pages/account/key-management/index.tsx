import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { DeviceKeysContainer } from '~/modules/KeysManagement/containers/DeviceKeys/DeviceKeysContainer';
import { DeviceKeyInfoContainer } from '~/modules/KeysManagement/containers/DeviceKeyInfo/DeviceKeyInfoContainer';
import { ActiveDeviceKeyProvider } from '~/modules/KeysManagement/contexts/ActiveDeviceKey/ActiveDeviceKeyContext';
import { AddNewKeyButtonView } from '~/modules/KeysManagement/views/AddNewKeyButton/AddNewKeyButtonView';
import { DeviceKeysPitchContainer } from '~/modules/KeysManagement/containers/DeviceKeysPitch/DeviceKeysPitchContainer';

import style from './style.module.scss';

const KeyManagement: NextPage = () => {
  return (
    <>
      <Head>
        <title>Key management</title>

        <OpenGraphComponent title="Key management" description="Key management" img="/static/media/og-picture.jpeg" />
      </Head>

      <ProtectedLayout links={accountPagePaths}>
        <div className={style.keyManagement}>
          <div className={style.keyManagementTop}>
            <div className={style.keyManagementHeadlineRow}>
              <ProtectedLayoutHeadlineComponent className={style.keyManagementHeadline}>
                Key management
              </ProtectedLayoutHeadlineComponent>
              <AddNewKeyButtonView />
            </div>

            <DeviceKeysPitchContainer className={style.keyManagementPitch} />
          </div>

          <div className={style.keyManagementBottom}>
            <ActiveDeviceKeyProvider>
              <DeviceKeysContainer className={style.keyManagementKeys} />
              <DeviceKeyInfoContainer className={style.keyManagementKeyInfo} />
            </ActiveDeviceKeyProvider>
          </div>
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(KeyManagement);
