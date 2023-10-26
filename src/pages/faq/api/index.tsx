import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { API_DOC_URL, SDK_URL } from '~/constants/configConstants';
import { faqPagePaths } from '~/constants/pathsConstants';
import { FaqAccordionComponent } from '~/components/FaqAccordion/FaqAccordionComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { FaqLayout } from '~/layouts/Faq/FaqLayout';

import style from './style.module.scss';

const Api: NextPage = () => {
  return (
    <>
      <Head>
        <title>FAQ - API</title>

        <OpenGraphComponent title="FAQ" description="API" />
      </Head>

      <FaqLayout headline="API" links={faqPagePaths}>
        <FaqAccordionComponent headline="API keys" defaultValue>
          <p className={style.faqText}>
            In order to generate API keys, please follow our guide&nbsp;
            <LinkComponent href={SDK_URL} target="_blank">
              here
            </LinkComponent>
            .
          </p>

          <p className={style.faqText}>API keys are restricted so that they may not:</p>

          <ul className={style.faqList}>
            <li className={style.faqListItem}>Whitelist withdrawal addresses</li>
            <li className={style.faqListItem}>Create additional API keys</li>
          </ul>
        </FaqAccordionComponent>

        <FaqAccordionComponent headline="Documentation">
          <p className={style.faqText}>
            See our API Documentation&nbsp;
            <LinkComponent href={API_DOC_URL} target="_blank">
              here
            </LinkComponent>
            .
          </p>
        </FaqAccordionComponent>
      </FaqLayout>
    </>
  );
};

export default Api;
