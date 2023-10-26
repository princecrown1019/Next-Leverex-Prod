import React, { FC, RefObject } from 'react';

import clsx from 'clsx';

import { MainPath } from '~/constants/pathsConstants';
import { LinkButtonComponent } from '~/components/LinkButton/LinkButtonComponent';
import { CarouselCenteredComponent } from '~/components/CarouselCentered/CarouselCenteredComponent';
import { ExploreCarouselSlideImgComponent } from '~/modules/Landing/components/ExploreCarouselSlideImg/ExploreCarouselSlideImgComponent';
import { LandingHeadingComponent } from '~/modules/Landing/components/Heading/HeadingComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  containerRef: RefObject<HTMLDivElement>;
};

export const LandingExploreView: FC<Props> = ({ className, containerRef }) => (
  <section className={clsx(className)} id="explore" ref={containerRef}>
    <LandingHeadingComponent headline="Start trading now" pitch="Robust. Precise. Simple." />

    <LinkButtonComponent className={style.exploreButtonLink} href={MainPath.EXCHANGE}>
      Start trading
    </LinkButtonComponent>

    <CarouselCenteredComponent
      className={style.exploreCarousel}
      itemClassName={style.exploreCarouselItem}
      activeItemClassName={style.exploreCarouselItemActive}
      withInitialAnimation
      duration={5000}
    >
      <ExploreCarouselSlideImgComponent
        src="/static/media/landing/exchange-screenshot.svg"
        alt="Exchange page screenshot"
      />
      <ExploreCarouselSlideImgComponent
        src="/static/media/landing/dashboard-screenshot.svg"
        alt="Dashboard page screenshot"
      />
      <ExploreCarouselSlideImgComponent
        src="/static/media/landing/trade-history-screenshot.svg"
        alt="Trade history page screenshot"
      />
      <ExploreCarouselSlideImgComponent
        src="/static/media/landing/transfers-screenshot.svg"
        alt="Transfers page screenshot"
      />
      <ExploreCarouselSlideImgComponent
        src="/static/media/landing/withdrawals-screenshot.svg"
        alt="Withdrawals page screenshot"
      />
      <ExploreCarouselSlideImgComponent
        src="/static/media/landing/deposits-screenshot.svg"
        alt="Deposits page screenshot"
      />
    </CarouselCenteredComponent>
  </section>
);
