import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useMedia } from '~/hooks/Media/useMedia';
import { useDebounce } from '~/hooks/Debounce/useDebounce';
import { useOnScreen } from '~/hooks/OnScreen/useOnScreen';
import { ToolsTradeOneComponent } from '~/modules/Landing/components/ToolsTradeOne/ToolsTradeOneComponent';
import { ToolsTradeTwoComponent } from '~/modules/Landing/components/ToolsTradeTwo/ToolsTradeTwoComponent';
import { ToolsControlOneComponent } from '~/modules/Landing/components/ToolsControlOne/ToolsControlOneComponent';
import { ToolsControlTwoComponent } from '~/modules/Landing/components/ToolsControlTwo/ToolsControlTwoComponent';
import { ToolsEnterpriseOneComponent } from '~/modules/Landing/components/ToolsEnterpriseOne/ToolsEnterpriseOneComponent';
import { ToolsEnterpriseTwoComponent } from '~/modules/Landing/components/ToolsEnterpriseTwo/ToolsEnterpriseTwoComponent';
import { ToolsEnterpriseThreeComponent } from '~/modules/Landing/components/ToolsEnterpriseThree/ToolsEnterpriseThreeComponent';
import { LandingToolsView, Props as ViewProps } from '~/modules/Landing/views/Tools/ToolsView';

type Props = Pick<ViewProps, 'className' | 'containerRef'>;

const getData = (element: null | Element) => {
  if (!element) return { margin: 0, width: 0 };

  const margin = window.getComputedStyle(element, null).getPropertyValue('margin-right').replace('px', '');

  return { margin: Number(margin), width: element.clientWidth };
};

const carouselImages = [
  '/static/media/landing/trade-1.svg',
  '/static/media/landing/trade-2.svg',
  '/static/media/landing/control-1.svg',
  '/static/media/landing/control-2.svg',
  '/static/media/landing/enterprise-1.svg',
  '/static/media/landing/enterprise-2.svg',
  '/static/media/landing/enterprise-3.svg'
];

const carouselItems = [
  [<ToolsTradeOneComponent key={1} />, <ToolsTradeTwoComponent key={2} />],
  [<ToolsControlOneComponent key={3} />, <ToolsControlTwoComponent key={4} />],
  [
    <ToolsEnterpriseOneComponent key={5} />,
    <ToolsEnterpriseTwoComponent key={6} />,
    <ToolsEnterpriseThreeComponent key={7} />
  ]
];

export const LandingToolsContainer: FC<Props> = ({ className, containerRef }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLUListElement>(null);

  const [tabIdx, setTabIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  const isMobile = useMedia(1100.98);
  const isHighScreen = useMedia(1920.98, 'min');
  const isOnScreen = useOnScreen(carouselRef);

  const delay = isHighScreen ? 550 : 350;
  const debouncedTabIdx = useDebounce(tabIdx, delay);

  useEffect(() => {
    Promise.all(
      carouselImages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.addEventListener('load', () => {
            resolve(img);
          });
          img.src = src;
        });
      })
    ).then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;

    carouselRef.current.style.transform = 'translateX(100%)';
    carouselRef.current.style.opacity = '0';
  }, [tabIdx]);

  useEffect(() => {
    if (!isMobile) return;

    const child = tabsRef.current?.children.item(0);
    if (!tabsRef.current || !child) return;

    const { width, margin } = getData(child);
    const w = tabIdx ? (width + margin) * tabIdx : 0;

    tabsRef.current.style.transform = `translateX(calc(((100% - ${width}px) / 2) - ${w}px))`;
  }, [tabIdx, isOnScreen]);

  useEffect(() => {
    if (isMobile || !tabsRef.current) return;

    tabsRef.current.style.transform = '';
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile && !isOnScreen) return;
    if (!carouselRef.current || loading) return;

    carouselRef.current.style.transform = 'translateX(0%)';
    carouselRef.current.style.opacity = '1';
  }, [debouncedTabIdx, loading, isOnScreen, isMobile]);

  const handleTabChange = useCallback((idx: number) => {
    setTabIdx(idx);
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const nextTab = tabIdx + 1;
      if (nextTab > 2) return;

      setTabIdx(nextTab);
    },
    onSwipedRight: () => {
      const prevTab = tabIdx - 1;
      if (prevTab < 0) return;

      setTabIdx(prevTab);
    }
  });

  return (
    <LandingToolsView
      className={className}
      activeTabIdx={tabIdx}
      swipeHandlers={swipeHandlers}
      containerRef={containerRef}
      carouselRef={carouselRef}
      tabsRef={tabsRef}
      delay={delay}
      isOnScreen={isOnScreen}
      handleTabChange={handleTabChange}
    >
      {carouselItems[debouncedTabIdx]}
    </LandingToolsView>
  );
};
