import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { NewsItemLayout } from '~/layouts/NewsItem/NewsLayout';
import { NewsHeaderContainer } from '~/modules/News/containers/Header/HeaderContainer';

const SingleBlogPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Some nice placeholder text</title>

        <OpenGraphComponent title="Some nice placeholder text" description="Some nice placeholder text" />
      </Head>

      <NewsHeaderContainer withProgressScroll />

      <NewsItemLayout
        headline="Some nice placeholder text"
        author="John Doe"
        image="/static/media/landing/exchange-screenshot-half.svg"
        timestamp={Date.now()}
      >
        <h2>[article content]</h2>
      </NewsItemLayout>
    </>
  );
};

export default SingleBlogPage;
