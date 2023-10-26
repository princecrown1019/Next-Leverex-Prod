import React, { useMemo } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import clsx from 'clsx';

import { MainLayout } from '~/layouts/Main/MainLayout';
import { TradeContainer } from '~/modules/Trade/containers/Trade/TradeContainer';
import { TradeDataContainer } from '~/modules/TradeData/containers/TradeData/TradeDataContainer';
import { StatsContainer } from '~/modules/Stats/containers/Stats/StatsContainer';
import { OverviewContainer } from '~/modules/Overview/containers/Overview/OverviewContainer';
import { PositionsContainer } from '~/modules/Positions/containers/Positions/PositionsContainer';
import { useMedia } from '~/hooks/Media/useMedia';
import { MarketProvider } from '~/modules/Trade/contexts/Market/MarketContext';
import { ResizableComponent } from '~/components/Resizable/ResizableComponent';
import { ResizableSection } from '~/constants/resizableSectionsConstants';
import { LoadingSocketWrapperComponent } from '~/components/LoadingSocketWrapper/LoadingSocketWrapperComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';

import style from './style.module.scss';

const Exchange: NextPage = () => {
  const mdMedia = useMedia(1100.98);
  const smMedia = useMedia(840.98);

  const mobileCahartNode = useMemo(
    () =>
      mdMedia ? (
        <LoadingSocketWrapperComponent className={style.exchangeMainRight}>
          <OverviewContainer className={style.exchangeOverview} mobile={!!smMedia} withoutTabs />
        </LoadingSocketWrapperComponent>
      ) : null,
    [mdMedia, smMedia]
  );

  const mainNode = useMemo(
    () => (
      <>
        <StatsContainer className={style.exchangeStatsTablet} />
        <div className={style.exchangeMainContent}>
          <TradeContainer className={clsx(style.exchangeWidget, style.exchangeWidgetTrade)} />
          <div className={style.exchangeMain}>
            <StatsContainer className={style.exchangeStats} />
            <div className={style.exchangeMainBottom}>
              <TradeDataContainer className={clsx(style.exchangeWidget, style.exchangeWidgetTradeData)} />
              {!mdMedia && (
                <LoadingSocketWrapperComponent className={style.exchangeMainRight}>
                  <OverviewContainer className={style.exchangeOverview} />
                  <ResizableComponent
                    className={style.exchangePositionsResizable}
                    uniqueId={ResizableSection.EXCHANGE_POSITION}
                    top
                  >
                    <PositionsContainer className={style.exchangePositions} />
                  </ResizableComponent>
                </LoadingSocketWrapperComponent>
              )}
            </div>
          </div>
        </div>
      </>
    ),
    [mdMedia]
  );

  return (
    <>
      <Head>
        <title>Exchange</title>

        <OpenGraphComponent title="Exchange" description="Exchange" img="/static/media/og-picture.jpeg" />
      </Head>

      <MainLayout className={style.exchange}>
        <MarketProvider>
          {mobileCahartNode}
          {mainNode}
        </MarketProvider>
      </MainLayout>
    </>
  );
};

export default Exchange;
