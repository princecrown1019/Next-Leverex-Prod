import { RefObject, useEffect, useRef } from 'react';

export const useResize = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', callback);

    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);
};

export const useHorizontalResize = <E extends Element>(callback: () => void, ref: RefObject<E>) => {
  const initialRectRef = useRef<DOMRect>();

  useEffect(() => {
    if (!ref.current) return;

    if (!initialRectRef.current) {
      initialRectRef.current = ref.current.getBoundingClientRect();
    }

    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === initialRectRef.current?.width) return;

      callback();
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);
};
