import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { SUPPORT_EMAIL } from '~/constants/configConstants';
import { MainPath } from '~/constants/pathsConstants';
import { StaticLayout } from '~/layouts/Static/StaticLayout';
import { StaticHeadlineComponent } from '~/components/StaticHeadline/StaticHeadlineComponent';
import { StaticPitchComponent } from '~/components/StaticPitch/StaticPitchComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';

import style from './style.module.scss';

const AboutUs: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us</title>

        <OpenGraphComponent
          title="About us"
          description="Leverex's innovative offering for digitized markets offers a collateral efficient infrastructure
          with transparent pricing, efficient margining, and settlement integrity."
          img="/static/media/og-picture.jpeg"
        />
      </Head>

      <StaticLayout headline="About Us">
        <section className={style.staticSection}>
          <StaticPitchComponent>
            Leverex&apos;s innovative offering for digitized markets offers a collateral efficient infrastructure with
            transparent pricing, efficient margining, and settlement integrity.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Background</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Traditional clearing houses are built around trust and legal recourse where the only eligible participants
            are large financial institutions. Should one party move into default, margin calls and legal mechanisms
            guarantee the fulfilment obligations.
          </StaticPitchComponent>

          <StaticPitchComponent>
            In bitcoin, no such legal recourse exists. Leveraged trading and margining models need to resolve that no
            further collateral can be called upon in the event of margin exhaustion. This &quot;conundrum&quot; has up
            to now been resolved by requiring double-margin to enter a trade. Half the margin is used to cover profit
            and loss swings, the other half to cover cascading liquidation risks.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>How Leverex works</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Leverex&apos;s margining model revolutionizes leveraged trading by offering both single margin efficiencies
            and removes the risk of cascading liquidations. We accomplish this through our innovative model where the
            risk of each position is defined prior to entering a trade, all trades are settled at the expiry cut-off
            price, and the net exposure is either rolled or delivered at contract expiry.
          </StaticPitchComponent>

          <StaticPitchComponent>
            To understand the &quot;nitty-gritty&quot;, please consult the product specifications, our&nbsp;
            <LinkComponent href={MainPath.FAQ}>FAQ</LinkComponent> section, or contact our&nbsp;
            <LinkComponent href={`mailto:${SUPPORT_EMAIL}`}>support</LinkComponent>.
          </StaticPitchComponent>
        </section>
      </StaticLayout>
    </>
  );
};

export default AboutUs;
