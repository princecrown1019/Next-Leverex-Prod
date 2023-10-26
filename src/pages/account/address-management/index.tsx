import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { WhitelistedAddressesContainer } from '~/modules/AddressManagement/containers/WhitelistedAddresses/WhitelistedAddressesContainer';
import { AddNewAddressButtonContainer } from '~/modules/AddressManagement/containers/AddNewAddressButton/AddNewAddressButtonContainer';

import style from './style.module.scss';

const AddressManagement: NextPage = () => {
  return (
    <>
      <Head>
        <title>Address management</title>

        <OpenGraphComponent
          title="Address management"
          description="Address management"
          img="/static/media/og-picture.jpeg"
        />
      </Head>

      <ProtectedLayout links={accountPagePaths}>
        <div className={style.addressManagement}>
          <div className={style.addressManagementHeadlineRow}>
            <ProtectedLayoutHeadlineComponent>Address management</ProtectedLayoutHeadlineComponent>
            <AddNewAddressButtonContainer />
          </div>

          <WhitelistedAddressesContainer className={style.addressManagementContent} />
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(AddressManagement);
