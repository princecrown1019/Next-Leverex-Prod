import { RefObject, useCallback, useEffect, useState } from 'react';

export const useOnScreen = (ref?: RefObject<Element>, margin = 0) => {
  if (!ref) return false;

  const [isIntersecting, setIntersecting] = useState(false);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setIntersecting(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { rootMargin: `${margin}px` });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (!ref.current) return;

      observer.unobserve(ref.current);
    };
  }, []);

  return isIntersecting;
};
