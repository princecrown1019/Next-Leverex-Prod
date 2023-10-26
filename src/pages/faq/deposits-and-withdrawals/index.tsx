import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { faqPagePaths } from '~/constants/pathsConstants';
import { FaqAccordionComponent } from '~/components/FaqAccordion/FaqAccordionComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { FaqLayout } from '~/layouts/Faq/FaqLayout';

import style from './style.module.scss';

const DepositsAndWithdrawals: NextPage = () => {
  return (
    <>
      <Head>
        <title>FAQ - Deposits & Withdrawals</title>

        <OpenGraphComponent title="FAQ" description="Deposits & Withdrawals" />
      </Head>

      <FaqLayout headline="Deposits & Withdrawals" links={faqPagePaths}>
        <FaqAccordionComponent headline="Overview" defaultValue>
          <p className={style.faqText}>
            Leverex is a custodial exchange where products are traded and settled against stablecoins.
          </p>

          <p className={style.faqText}>Supported stablecoins:</p>
          <ul className={style.faqList}>
            <li className={style.faqListItem}>Liquid USDT</li>
          </ul>

          <p className={style.faqText}>Supported networks:</p>
          <ul className={style.faqList}>
            <li className={style.faqListItem}>Liquid Network</li>
          </ul>

          <p className={style.faqText}>
            There are no fees on deposits and withdrawals. Leverex will pay the blockchain network fee for all
            withdrawals on the Liquid network.
          </p>
        </FaqAccordionComponent>

        <FaqAccordionComponent headline="Deposits">
          <p className={style.faqText}>
            Each user receives a fixed deposit address. Only Liquid USDT may be sent to the address.
          </p>

          <p className={style.faqText}>
            To enable conversion of different cryptocurrency types, Leverex has integrated Sideshifts API into our
            deposit page. The Sideshift output address will always be your unique deposit address and the output asset
            is set to Liquid USDT.
          </p>

          <p className={style.faqText}>Deposits are confirmed once they have two (2) network confirmations.</p>
        </FaqAccordionComponent>

        <FaqAccordionComponent headline="Withdrawals">
          <p className={style.faqText}>Withdrawals are permitted to addresses which have been whitelisted.</p>

          <p className={style.faqText}>
            Withdrawals covered by our hot-wallet are processed in real-time. We rebalance between our hot and cold
            wallets several times a day.
          </p>
        </FaqAccordionComponent>
      </FaqLayout>
    </>
  );
};

export default DepositsAndWithdrawals;
