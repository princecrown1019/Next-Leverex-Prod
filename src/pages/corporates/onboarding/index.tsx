import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { StaticLayout } from '~/layouts/Static/StaticLayout';
import { CorporateOnboardingContainer } from '~/modules/CorporateOnboarding/containers/CorporateOnboarding/CorporateOnboardingContainer';
import { StaticPitchComponent } from '~/components/StaticPitch/StaticPitchComponent';
import { ContactButtonContainer } from '~/modules/CorporateOnboarding/containers/ContactButton/ContactButtonContainer';
import { StaticHeadlineComponent } from '~/components/StaticHeadline/StaticHeadlineComponent';
import { AuthEidDownloadButtonContainer } from '~/modules/CorporateOnboarding/containers/AuthEidDownloadButton/AuthEidDownloadButtonContainer';
import { RegistrationButtonContainer } from '~/modules/CorporateOnboarding/containers/RegistrationButton/RegistrationButtonContainer';

import style from './style.module.scss';

export const getServerSideProps = () => ({ props: {} });

const CorporatesOnboarding: NextPage = () => {
  return (
    <>
      <Head>
        <title>Corporates onboarding</title>
        <OpenGraphComponent
          title="Corporate onboarding"
          description="Corporate onboarding"
          img="/static/media/og-picture.jpeg"
        />
      </Head>

      <StaticLayout headline="Corporate onboarding">
        <section className={style.staticSection}>
          <StaticPitchComponent>
            Follow through a simple 3 step procedure to open a corporate account at Leverex.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>1. Auth eID app</StaticHeadlineComponent>
          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Our corporate onboarding requires to confirm your identity via Auth eID app. If you already have your
            identity confirmed continue to the next step. If you don’t have Auth eID yet, you can&nbsp;
            <AuthEidDownloadButtonContainer />.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>2. Leverex account</StaticHeadlineComponent>
          <StaticPitchComponent className={style.staticPitchMarginTop}>
            As part of the corporate onboarding we ask that our potential partners already have a personal Leverex
            account created. If you have already registered with Leverex, continue below to fill out the corporate form.
            If you don’t have an account with Leverex, you can <RegistrationButtonContainer />.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>3. Onboarding form</StaticHeadlineComponent>
          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Fill out our corporate onboarding details and we will be in touch with you shortly.
          </StaticPitchComponent>

          <CorporateOnboardingContainer className={style.onboardingForm} />
        </section>

        <StaticPitchComponent className={style.staticPitchFooter}>
          Have additional questions? <ContactButtonContainer />.
        </StaticPitchComponent>
      </StaticLayout>
    </>
  );
};

export default CorporatesOnboarding;
