import React, { FC, RefObject } from 'react';

import { FeaturesItemComponent } from '~/modules/Landing/components/FeaturesItem/FeaturesItemComponent';
import { LandingHeadingComponent } from '~/modules/Landing/components/Heading/HeadingComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  containerRef: RefObject<HTMLDivElement>;
  listRef: RefObject<HTMLUListElement>;
};

const fees = [
  'Only taker and maker fees applied',
  'No funding costs burning away at your capital',
  'No other hidden fees'
];

const leverage = [
  'Defined profit and loss schedules',
  'No cascading or forced liquidations',
  'Never go negative and leave residual losses'
];

const flexibility = [
  'Easy way to access leveraged crypto trading',
  'Manage your risks and exposures',
  'Realize your profits on each hour'
];

const awards = [
  '10x leverage - reach your planned goals faster',
  'No liquidation slippage',
  'Deposits and Withdrawals in less than 60 seconds'
];

export const LandingFeaturesView: FC<Props> = ({ className, containerRef, listRef }) => (
  <section className={className} id="features" ref={containerRef}>
    <LandingHeadingComponent headline="A better place to trade" pitch="Made by traders for traders" />

    <ul className={style.featuresList} ref={listRef}>
      <FeaturesItemComponent className={style.featuresItemFees} headline="Low and transparent fees" features={fees} />

      <FeaturesItemComponent
        className={style.featuresItemLeverage}
        headline="Simplified leverage"
        features={leverage}
      />

      <FeaturesItemComponent
        className={style.featuresItemFlexibility}
        headline="Flexibility for your decisions"
        features={flexibility}
      />

      <FeaturesItemComponent className={style.featuresItemAward} headline="Always step a head" features={awards} />
    </ul>
  </section>
);
