import React, { FC, useMemo } from 'react';

import clsx from 'clsx';
import dynamic from 'next/dynamic';

import { TabsComponent } from '~/components/Tabs/TabsComponent';
import { StreamsContainer } from '~/modules/Overview/containers/Streams/StreamsContainer';
import { OverviewDetailsContainer } from '~/modules/Overview/containers/Details/DetailsContainer';

import style from './style.module.scss';

export type Props = {
  className?: string;
  tabIdx: number;
  mobile?: boolean;
  withoutTabs?: boolean;
  handleTabChange: (idx: number) => void;
};

const PriceChartContainer = dynamic(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  () =>
    import('~/modules/Overview/containers/PriceChart/ChartContainer').then(
      (module) => module.OverviewPriceChartContainer
    ),
  { ssr: false }
);

export const OverviewView: FC<Props> = ({ className, tabIdx, mobile, withoutTabs, handleTabChange }) => {
  const views = useMemo(() => [null, <StreamsContainer key={2} />, <OverviewDetailsContainer key={3} />], []);

  const chart = useMemo(() => <PriceChartContainer key={1} mobile={mobile} />, [mobile]);

  return (
    <div className={clsx(style.overview, className)}>
      {!withoutTabs && (
        <div className={style.overviewTabs}>
          <TabsComponent
            tabClassName={style.overviewTab}
            rounded
            tabs={['Price', 'Streams', 'Details']}
            handleChange={handleTabChange}
          />
        </div>
      )}
      <div className={style.overviewContent}>
        <div className={clsx(style.overviewChart, !!tabIdx && style.overviewChartHidden)}>{chart}</div>
        {views[tabIdx]}
      </div>
    </div>
  );
};
