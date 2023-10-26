import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';
import { NewsItemLayout } from '~/layouts/NewsItem/NewsLayout';
import { NewsHeaderContainer } from '~/modules/News/containers/Header/HeaderContainer';

const desc = 'Leverex.io today announced the launch of its derivatives trading platform and rolling futures product.';

const PressReleasePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Leverex Announces the Launch</title>

        <OpenGraphComponent
          title="Leverex Announces the Launch of its Derivatives Trading Platform"
          description={desc}
          type="article"
          twitterType="article"
          articleAuthor="Leverex team"
        />
      </Head>

      <NewsHeaderContainer withProgressScroll />

      <NewsItemLayout
        headline="Leverex Announces the Launch of its Derivatives Trading Platform"
        author="Leverex team"
        image="/static/media/news/press-release-asset.png"
        timestamp={new Date('Fri Oct 01 2022').getTime()}
      >
        <p>
          <strong>1 October 2022</strong>
        </p>

        <p>Leverex.io today announced the launch of its derivatives trading platform.</p>

        <p>
          Leverex was developed to simplify derivatives trading and make it more accessible. Even with decades of
          trading experience in Leverex’s founding team, we believe that many complex concepts on existing derivatives
          platforms such as cascading liquidations, clawbacks, funding rates makes trading complicated and rigged in the
          favour of more experienced traders.
        </p>

        <p>
          That is why we are proud today to launch Leverex. Our offering showcases how a challenger futures market can
          offer an improved risk model and bring a welcome benchmark for how leveraged markets may be safely and
          transparently traded.
        </p>

        <p>
          The first product on the platform is a rolling bitcoin futures contract. The BTC rolling futures contract will
          be traded versus USDt (initially on the liquid network). Users will be able to deposit USDt by swapping most
          cryptocurrencies versus USDt with the use of Sideshift.ai. Based on our innovative risk model there are no
          funding costs, no forced liquidations and users may get started with as little as 1 USDT.
        </p>

        <h2>About Leverex</h2>

        <p>Leverex was established in 2021 to offer an improved risk model for Futures trading.</p>

        <p>
          We offer a Rolling Futures contract where trades are novated, risks are pre-defined and transparent,
          net-exposure rolls on an hourly basis, and liquidations occur without cascading sales.
        </p>
      </NewsItemLayout>
    </>
  );
};

export default PressReleasePage;
