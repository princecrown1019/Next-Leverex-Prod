import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { COMPLIANCE_EMAIL } from '~/constants/configConstants';
import { StaticLayout } from '~/layouts/Static/StaticLayout';
import { StaticPitchComponent } from '~/components/StaticPitch/StaticPitchComponent';
import { LinkEmailComponent } from '~/components/LinkEmail/LinkEmailComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';

import style from './style.module.scss';

const Regulation: NextPage = () => {
  return (
    <>
      <Head>
        <title>Regulation</title>

        <OpenGraphComponent title="Regulation" description="Regulation" img="/static/media/og-picture.jpeg" />
      </Head>

      <StaticLayout headline="Regulation">
        <section className={style.staticSection}>
          <StaticPitchComponent>
            Leverex is committed to upholding the highest of standards with regards to knowing our customers, anti-money
            laundering and compliance.
          </StaticPitchComponent>

          <StaticPitchComponent>
            Leverex does not onboard clients from restricted locations, currently these countries are the U.S.
          </StaticPitchComponent>

          <StaticPitchComponent>
            Should you have any questions with regards to our regulatory environment or any compliance matter, you may
            reach us through <LinkEmailComponent>{COMPLIANCE_EMAIL}</LinkEmailComponent>.
          </StaticPitchComponent>
        </section>
      </StaticLayout>
    </>
  );
};

export default Regulation;
