import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { ButtonBackComponent } from '~/components/ButtonBack/ButtonBackComponent';
import { AddNewKeyContainer } from '~/modules/KeysManagement/containers/AddNewKey/AddNewKeyContainer';
import { BackArrowIcon } from '~/assets/Icons';

import style from './style.module.scss';

const KeyManagementNew: NextPage = () => {
  return (
    <>
      <Head>
        <title>Add new device key</title>

        <OpenGraphComponent
          title="Add new device key"
          description="Add new device key"
          img="/static/media/og-picture.jpeg"
        />
      </Head>

      <ProtectedLayout links={accountPagePaths}>
        <div className={style.addDeviceKey}>
          <div className={style.addDeviceKeyHeadlineRow}>
            <ButtonBackComponent className={style.addDeviceKeyBackButton}>
              <BackArrowIcon />
            </ButtonBackComponent>
            <ProtectedLayoutHeadlineComponent>Add new device key</ProtectedLayoutHeadlineComponent>
          </div>

          <AddNewKeyContainer className={style.addDeviceKeyContent} />
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(KeyManagementNew);
