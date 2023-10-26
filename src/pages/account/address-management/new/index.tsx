import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { accountPagePaths } from '~/constants/pathsConstants';
import { withSession } from '~/hocs/Session/withSession';
import { ProtectedLayout } from '~/layouts/Protected/ProtectedLayout';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { ButtonBackComponent } from '~/components/ButtonBack/ButtonBackComponent';
import { WhitelistAnAddressContainer } from '~/modules/AddressManagement/containers/WhitelistAnAddress/WhitelistAnAddressContainer';
import { BackArrowIcon } from '~/assets/Icons';

import style from './style.module.scss';

const AddressManagementNew: NextPage = () => {
  return (
    <>
      <Head>
        <title>Whitelist new address</title>

        <OpenGraphComponent
          title="Whitelist new address"
          description="Whitelist new address"
          img="/static/media/og-picture.jpeg"
        />
      </Head>

      <ProtectedLayout links={accountPagePaths}>
        <div className={style.whitelistAddress}>
          <div className={style.whitelistAddressHeadlineRow}>
            <ButtonBackComponent className={style.whitelistAddressBackButton}>
              <BackArrowIcon />
            </ButtonBackComponent>
            <ProtectedLayoutHeadlineComponent>Whitelist new address</ProtectedLayoutHeadlineComponent>
          </div>

          <WhitelistAnAddressContainer className={style.whitelistAddressContent} />
        </div>
      </ProtectedLayout>
    </>
  );
};

export default withSession(AddressManagementNew);
