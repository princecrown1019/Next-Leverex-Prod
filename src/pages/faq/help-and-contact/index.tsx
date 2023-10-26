import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { COMPLIANCE_EMAIL, DISCORD_URL, SUPPORT_EMAIL, TELEGRAM_URL } from '~/constants/configConstants';
import { faqPagePaths } from '~/constants/pathsConstants';
import { FaqAccordionComponent } from '~/components/FaqAccordion/FaqAccordionComponent';
import { LinkEmailComponent } from '~/components/LinkEmail/LinkEmailComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { FaqLayout } from '~/layouts/Faq/FaqLayout';
import { LinkComponent } from '~/components/Link/LinkComponent';

import style from './style.module.scss';

const HelpAndContact: NextPage = () => {
  return (
    <>
      <Head>
        <title>FAQ - Help & Contact</title>

        <OpenGraphComponent title="FAQ" description="Help & Contact" />
      </Head>

      <FaqLayout headline="Help & Contact" links={faqPagePaths}>
        <FaqAccordionComponent headline="Support Desk" defaultValue>
          <p className={style.faqText}>
            If you would like to get in contact with our support desk, please reach us through the following channels:
          </p>

          <ul className={style.faqList}>
            <li className={style.faqListItem}>
              <LinkEmailComponent className={style.faqLink}>{SUPPORT_EMAIL}</LinkEmailComponent>
            </li>
            <li className={style.faqListItem}>
              <LinkComponent className={style.faqLink} href={TELEGRAM_URL} target="_blank">
                Telegram
              </LinkComponent>
            </li>
            <li className={style.faqListItem}>
              <LinkComponent className={style.faqLink} href={DISCORD_URL} target="_blank">
                Discord
              </LinkComponent>
            </li>
          </ul>
        </FaqAccordionComponent>

        <FaqAccordionComponent headline="Regulation">
          <p className={style.faqText}>
            Leverex is committed to upholding the highest of standards with regards to knowing our customers, anti-money
            laundering and compliance.
          </p>

          <p className={style.faqText}>
            Leverex does not onboard clients from restricted locations, currently these countries are the U.S.
          </p>

          <p className={style.faqText}>
            Should you have any questions with regards to our regulatory environment or any compliance matter, you may
            reach us through <LinkEmailComponent>{COMPLIANCE_EMAIL}</LinkEmailComponent>.
          </p>
        </FaqAccordionComponent>
      </FaqLayout>
    </>
  );
};

export default HelpAndContact;
