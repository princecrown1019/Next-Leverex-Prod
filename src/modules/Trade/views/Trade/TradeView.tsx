import React, { FC } from 'react';

import clsx from 'clsx';

import { TabsComponent } from '~/components/Tabs/TabsComponent';
import { MarketContainer } from '~/modules/Trade/containers/Market/MarketContainer';
import { LadderContainer } from '~/modules/Trade/containers/Ladder/LadderContainer';
import { LoadingSocketWrapperComponent } from '~/components/LoadingSocketWrapper/LoadingSocketWrapperComponent';
import { ProductSelectorContainer } from '~/modules/ProductSelector/containers/Selector/SelectorContainer';
import { SessionHealthComponent } from '~/components/SessionHealth/SessionHealthComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  tabIdx: number;
  handleTabChange: (value: number) => void;
};

const tabs = [<MarketContainer key={1} />, <LadderContainer key={2} />];

export const TradeView: FC<Props> = ({ className, tabIdx, handleTabChange }) => (
  <LoadingSocketWrapperComponent className={clsx(style.trade, className)}>
    <ProductSelectorContainer />

    <TabsComponent
      className={style.tradeTabs}
      tabClassName={style.tradeTab}
      tabs={['Market', 'Ladder']}
      disabled={[false, false]}
      handleChange={handleTabChange}
    />
    <div className={style.tradeInner}>
      {tabs[tabIdx]}
      <SessionHealthComponent />
    </div>
  </LoadingSocketWrapperComponent>
);
