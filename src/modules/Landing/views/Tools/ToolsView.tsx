import React, { FC, ReactNode, RefObject } from 'react';
import { SwipeableHandlers } from 'react-swipeable';

import clsx from 'clsx';

import { CarouselRightSideComponent } from '~/components/CarouselRightSide/CarouselRightSideComponent';
import { LandingHeadingComponent } from '~/modules/Landing/components/Heading/HeadingComponent';
import { ToolsTabsComponent } from '~/modules/Landing/components/ToolsTabs/ToolsTabsComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  containerRef: RefObject<HTMLDivElement>;
  tabsRef: RefObject<HTMLUListElement>;
  carouselRef: RefObject<HTMLDivElement>;
  activeTabIdx: number;
  delay: number;
  isOnScreen: boolean;
  swipeHandlers: SwipeableHandlers;
  children: ReactNode[];
  handleTabChange: (idx: number) => void;
};

export const LandingToolsView: FC<Props> = ({
  className,
  containerRef,
  tabsRef,
  carouselRef,
  activeTabIdx,
  delay,
  isOnScreen,
  swipeHandlers,
  children,
  handleTabChange
}) => (
  <section className={clsx(className)} id="tools" ref={containerRef}>
    <div className={style.toolsHeader}>
      <LandingHeadingComponent headline="Professional tools" pitch="Old solutions redefined" />
    </div>

    <div className={style.toolsHalfs} {...swipeHandlers}>
      <div className={clsx(style.toolsHalf, style.toolsHalfLeft)}>
        <ToolsTabsComponent activeIdx={activeTabIdx} tabsRef={tabsRef} handleChange={handleTabChange} />
      </div>

      <div className={style.toolsHalf}>
        <CarouselRightSideComponent
          className={style.toolsCarouselContainer}
          itemClassName={style.toolsCarouselItem}
          indicatorsClassName={style.toolsCarouselIndicators}
          customRef={carouselRef}
          isOnScreen={isOnScreen}
          duration={3000}
          speed={delay}
        >
          {children}
        </CarouselRightSideComponent>
      </div>
    </div>
  </section>
);
