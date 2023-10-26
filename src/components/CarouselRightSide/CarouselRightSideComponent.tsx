import React, { FC, ReactNode, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';

import { CarouselIndicatorsComponent } from '~/components/CarouselIndicators/CarouselIndicatorsComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  slidesClassName?: string;
  itemClassName?: string;
  indicatorsClassName?: string;
  index?: number;
  duration: number;
  speed?: number;
  isOnScreen: boolean;
  customRef?: RefObject<HTMLDivElement>;
  children: ReactNode[];
};

export const CarouselRightSideComponent: FC<Props> = ({
  className,
  itemClassName,
  slidesClassName,
  indicatorsClassName,
  customRef,
  speed = 350,
  duration,
  index,
  isOnScreen,
  children
}) => {
  const slidesRef = customRef || useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const [activeIdx, setActiveIdx] = useState(index || 0);
  const [stopped, setStopped] = useState(false);

  const length = useMemo(() => children.length, [children[0]]);

  const handleSlideChange = useCallback(
    (idx: number, auto?: boolean) => {
      if (slidesRef.current) {
        slidesRef.current.style.transform = 'translateX(100%)';
        slidesRef.current.style.opacity = '0';
      }

      if (!auto && !stopped) {
        setStopped(true);
        clearInterval(intervalRef.current!);
      }

      setTimeout(() => {
        setActiveIdx(auto ? (prevIdx) => (prevIdx >= length - 1 ? 0 : prevIdx + 1) : idx);
      }, speed);
    },
    [stopped, length, speed]
  );

  useEffect(() => {
    if (!slidesRef.current) return;

    slidesRef.current.style.transform = 'translateX(0%)';
    slidesRef.current.style.opacity = '1';
  }, [activeIdx]);

  useEffect(() => {
    if (!activeIdx) return;

    setActiveIdx(0);
  }, [children]);

  useEffect(() => {
    clearInterval(intervalRef.current!);
    if (!isOnScreen) return;
    setStopped(false);

    intervalRef.current = setInterval(() => {
      handleSlideChange(0, true);
    }, duration);
  }, [isOnScreen, children[0]]);

  return (
    <div className={clsx(style.container, className)}>
      <div className={clsx(style.slides, slidesClassName)} ref={slidesRef}>
        <div className={itemClassName}>{children[activeIdx]}</div>
      </div>
      <CarouselIndicatorsComponent
        className={clsx(style.indicators, indicatorsClassName)}
        length={length}
        activeIdx={activeIdx}
        handleChange={handleSlideChange}
      />
    </div>
  );
};
