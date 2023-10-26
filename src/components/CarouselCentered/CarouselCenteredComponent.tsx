import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import clsx from 'clsx';

import { useOnScreen } from '~/hooks/OnScreen/useOnScreen';
import { CarouselIndicatorsComponent } from '~/components/CarouselIndicators/CarouselIndicatorsComponent';
import { CarouselCenteredSlidesComponent } from '~/components/CarouselCenteredSlides/CarouselCenteredSlidesComponent';

import style from './style.module.scss';

const getMargin = (element: null | Element) => {
  if (!element) return 0;

  const px = window.getComputedStyle(element, null).getPropertyValue('margin-right').replace('px', '');

  return Number(px);
};

export type Props = {
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  duration: number;
  withInitialAnimation?: boolean;
  children: ReactNode[];
};

export const CarouselCenteredComponent: FC<Props> = ({
  className,
  itemClassName,
  activeItemClassName,
  duration,
  withInitialAnimation,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const [activeIdx, setActiveIdx] = useState(0);

  const isOnScreen = useOnScreen(containerRef, -50);

  const length = useMemo(() => children.length, []);

  useEffect(() => {
    if (!isOnScreen) return;

    const itemElement = slidesRef.current?.children.item(0);
    if (!slidesRef.current || !itemElement) return;

    const { clientWidth } = itemElement;
    const margin = getMargin(itemElement);

    const w = activeIdx ? (clientWidth + margin) * activeIdx : 0;

    slidesRef.current.style.transform = `translate3d(calc(((100% - ${clientWidth}px) / 2) - ${w}px), 0px, 0px)`;
  }, [activeIdx, isOnScreen]);

  const handleSlideChange = useCallback((idx: number) => {
    setActiveIdx(idx);

    if (slidesRef.current?.classList.contains(style.slidesWithInitialAnimation)) {
      slidesRef.current.classList.remove(style.slidesWithInitialAnimation);
    }
  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current!);
    if (!isOnScreen) return;

    timeoutRef.current = setTimeout(() => {
      handleSlideChange(activeIdx === length - 1 ? 0 : activeIdx + 1);
    }, duration);
  }, [activeIdx, isOnScreen]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const nextTab = activeIdx + 1;
      if (nextTab > length - 1) return;

      handleSlideChange(nextTab);
    },
    onSwipedRight: () => {
      const prevTab = activeIdx - 1;
      if (prevTab < 0) return;

      handleSlideChange(prevTab);
    }
  });

  return (
    <div className={clsx(style.container, className)} {...swipeHandlers} ref={containerRef}>
      <CarouselCenteredSlidesComponent
        className={clsx(style.slides, withInitialAnimation && style.slidesWithInitialAnimation)}
        itemClassName={itemClassName}
        activeItemClassName={activeItemClassName}
        ref={slidesRef}
        handleChange={handleSlideChange}
        activeIdx={activeIdx}
      >
        {children}
      </CarouselCenteredSlidesComponent>
      <CarouselIndicatorsComponent
        className={style.indicators}
        length={length}
        activeIdx={activeIdx}
        handleChange={handleSlideChange}
      />
    </div>
  );
};
