import React, { useCallback, useState, MouseEvent, memo, useRef, useEffect } from 'react';

import style from './style.module.scss';

export type Props = {
  disabled?: boolean;
};

type Ripple = {
  top: number;
  left: number;
  height: number;
  width: number;
  backgroundColor?: string;
  animationDuration?: string;
};

const getRipple = (pageX: number, pageY: number, { width, height, x, y }: DOMRect): Ripple => {
  const size = width > height ? width : height;
  const halfSize = size / 2;

  const left = pageX - x - halfSize;
  const top = pageY - y - halfSize;

  return { top, left, height: size, width: size };
};

export const RippleComponent = memo<Props>(({ disabled }) => {
  const rectRef = useRef<DOMRect>();
  const backgroundColorRef = useRef<string>();
  const animationDurationRef = useRef<number>();

  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let timeout: null | NodeJS.Timeout = null;

    if (ripples.length > 0) {
      clearTimeout(timeout!);

      timeout = setTimeout(() => {
        setRipples([]);
        clearTimeout(timeout!);
      }, animationDurationRef.current);
    }

    return () => clearTimeout(timeout!);
  }, [ripples.length]);

  const handleMouseDown = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      const rect = rectRef.current || event.currentTarget.getBoundingClientRect();
      const ripple = getRipple(event.pageX, event.pageY, rect);

      if (!rectRef.current) {
        rectRef.current = rect;
      }

      if (event.currentTarget?.parentElement && !backgroundColorRef.current) {
        backgroundColorRef.current = window.getComputedStyle(event.currentTarget.parentElement).color;
      }

      if (!animationDurationRef.current) {
        animationDurationRef.current = Math.max(rect.height, rect.width, 400);
      }

      setRipples((prevRipples) => [
        ...prevRipples,
        {
          ...ripple,
          animationDuration: `${animationDurationRef.current}ms`,
          backgroundColor: backgroundColorRef.current
        }
      ]);
    },
    [disabled]
  );

  return (
    <span className={style.ripples} onMouseDown={handleMouseDown}>
      {ripples.map((ripple, idx) => (
        <span className={style.ripple} style={ripple} key={`ripple-${idx}`} />
      ))}
    </span>
  );
});
