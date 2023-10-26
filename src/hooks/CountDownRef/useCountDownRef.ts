import { useCallback, useEffect, useRef } from 'react';

const SECOND = 1000;

export const useCountDownRef = (time: number) => {
  const ref = useRef<HTMLSpanElement>(null);

  const tick = useCallback(() => {
    if (!ref.current) return;

    const difference = time ? time - Date.now() : 0;
    if (difference < 0) return;

    const seconds = Math.floor((difference / SECOND) % 60);
    const minutes = Math.floor((difference / SECOND / 60) % 60);
    const hours = Math.floor((difference / (SECOND * 60 * 60)) % 24);

    ref.current.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }, [time]);

  useEffect(() => {
    tick();

    const interval = setInterval(tick, SECOND);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return ref;
};
