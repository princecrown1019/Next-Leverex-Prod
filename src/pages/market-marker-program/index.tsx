import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import clsx from 'clsx';

import { DISCORD_URL, PARTNERSHIPS_EMAIL, SDK_URL, TELEGRAM_URL } from '~/constants/configConstants';
import { StaticLayout } from '~/layouts/Static/StaticLayout';
import { StaticHeadlineComponent } from '~/components/StaticHeadline/StaticHeadlineComponent';
import { StaticPitchComponent } from '~/components/StaticPitch/StaticPitchComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';

import style from './style.module.scss';

const MarketMarkerProgram: NextPage = () => {
  return (
    <>
      <Head>
        <title>Market marker program</title>

        <OpenGraphComponent
          title="Market marker program"
          description="Market marker program"
          img="/static/media/og-picture.jpeg"
        />
      </Head>

      <StaticLayout headline="Leverex's market maker program">
        <section className={style.staticSection}>
          <StaticHeadlineComponent>Dear Participant,</StaticHeadlineComponent>
          <StaticPitchComponent className={style.staticPitchMarginTop}>
            Leverex encourages Market-Making in our Rolling Futures contracts. As a Market Maker, you undertake to
            provide continuously streamed bids and offers and benefit from the ability to formulate prices while earning
            a commission on volume. Market Making is open to all participants.
          </StaticPitchComponent>
        </section>

        <section className={style.staticSection}>
          <StaticHeadlineComponent>Market Maker Program</StaticHeadlineComponent>

          <StaticPitchComponent className={style.staticPitchMarginTop}>Getting started:</StaticPitchComponent>
          <ol className={clsx(style.staticList, style.staticListDecimal)}>
            <li className={style.staticListItem}>Register an account with Leverex</li>
            <li className={style.staticListItem}>Connect to our system via API</li>
            <li className={style.staticListItem}>Fine-tune your system against our test environment</li>
            <li className={style.staticListItem}>Start streaming live bids and offers</li>
          </ol>

          <StaticPitchComponent>Test Environment:</StaticPitchComponent>
          <ul className={clsx(style.staticList, style.staticListDisc)}>
            <li className={style.staticListItem}>
              <LinkComponent href="https://testnet.leverex.io" target="_blank">
                https://testnet.leverex.io
              </LinkComponent>
            </li>
          </ul>

          <StaticPitchComponent>Open Source Repo (API and dealing module examples):</StaticPitchComponent>
          <ul className={clsx(style.staticList, style.staticListDisc)}>
            <li className={style.staticListItem}>
              <LinkComponent href={SDK_URL} target="_blank">
                {SDK_URL}
              </LinkComponent>
            </li>
          </ul>

          <StaticPitchComponent>
            Easy peasy lemon squeezy. If you have any additional questions, please engage our team via&nbsp;
            <LinkComponent href={DISCORD_URL} target="_blank">
              Discord
            </LinkComponent>
            ,&nbsp;
            <LinkComponent href={TELEGRAM_URL} target="_blank">
              Telegram
            </LinkComponent>
            , or&nbsp;
            <LinkComponent href={`mailto:${PARTNERSHIPS_EMAIL}`} target="_blank">
              email
            </LinkComponent>
            .
          </StaticPitchComponent>
        </section>

        <StaticPitchComponent className={style.staticPitchMarginTop}>- Leverex Team</StaticPitchComponent>
      </StaticLayout>
    </>
  );
};

export default MarketMarkerProgram;
