import React, { FC, RefObject } from 'react';

import clsx from 'clsx';

import { LandingHeadingComponent } from '~/modules/Corporates/components/Heading/HeadingComponent';
import { CarouselCenteredComponent } from '~/components/CarouselCentered/CarouselCenteredComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  containerRef: RefObject<HTMLDivElement>;
};

export const InstitutionsExploreView: FC<Props> = ({ className, containerRef }) => (
  <section className={clsx(className)} id="explore" ref={containerRef}>
    <LandingHeadingComponent headline="[Placeholder]" pitch="[Placeholder]" />

    <CarouselCenteredComponent
      className={style.exploreCarousel}
      itemClassName={style.exploreCarouselItem}
      activeItemClassName={style.exploreCarouselItemActive}
      withInitialAnimation
      duration={5000}
    >
      <div className={style.exploreSlidePresentation}>
        <h3 className={style.exploreCarouselItemHeadline}>[Placeholder text]</h3>
        <p className={style.exploreCarouselItemDescription}>
          [Placeholder description description description description description description description description
          description description description description description description description description description
          description description description description description description description description description]
          <br />
          <br />
          [Placeholder description description description description description description description description
          description description]
        </p>
      </div>
      <div className={style.exploreSlidePresentation}>
        <h3 className={style.exploreCarouselItemHeadline}>[Placeholder text]</h3>
        <p className={style.exploreCarouselItemDescription}>
          [Placeholder description description description description description description description description
          description description description description description description description description description
          description description description description description description description description description]
          <br />
          <br />
          [Placeholder description description description description description description description description
          description description]
        </p>
      </div>
      <div className={style.exploreSlidePresentation}>
        <h3 className={style.exploreCarouselItemHeadline}>[Placeholder text]</h3>
        <p className={style.exploreCarouselItemDescription}>
          [Placeholder description description description description description description description description
          description description description description description description description description description
          description description description description description description description description description]
          <br />
          <br />
          [Placeholder description description description description description description description description
          description description]
        </p>
      </div>
      <div className={style.exploreSlidePresentation}>
        <h3 className={style.exploreCarouselItemHeadline}>[Placeholder text]</h3>
        <p className={style.exploreCarouselItemDescription}>
          [Placeholder description description description description description description description description
          description description description description description description description description description
          description description description description description description description description description]
          <br />
          <br />
          [Placeholder description description description description description description description description
          description description]
        </p>
      </div>
      <div className={style.exploreSlidePresentation}>
        <h3 className={style.exploreCarouselItemHeadline}>[Placeholder text]</h3>
        <p className={style.exploreCarouselItemDescription}>
          [Placeholder description description description description description description description description
          description description description description description description description description description
          description description description description description description description description description]
          <br />
          <br />
          [Placeholder description description description description description description description description
          description description]
        </p>
      </div>
    </CarouselCenteredComponent>
  </section>
);
