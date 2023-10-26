import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { NewsContainer } from '~/modules/News/containers/News/NewsContainer';
import { NewsHeaderContainer } from '~/modules/News/containers/Header/HeaderContainer';
import { NewsLayout } from '~/layouts/News/NewsLayout';

const description = `Follow the Leverex news for company news, product announcements, feature updates, user stories,
and technical posts about trading.`;

const News: NextPage = () => {
  return (
    <>
      <Head>
        <title>News</title>

        <OpenGraphComponent title="News" description="Leverex news" />
      </Head>

      <NewsHeaderContainer />

      <NewsLayout headline="Leverex news" description={description}>
        <NewsContainer />
      </NewsLayout>
    </>
  );
};

export default News;
