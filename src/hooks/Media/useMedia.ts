import { useCallback, useEffect, useState } from 'react';

export const useMedia = (size: number, value?: string, orientation?: string) => {
  const [matches, setMatches] = useState<null | boolean>(null);

  const checkMatch = useCallback((event: MediaQueryListEvent | MediaQueryList) => setMatches(event.matches), []);

  useEffect(() => {
    const mq = window.matchMedia(`(${value || 'max'}-${orientation || 'width'}: ${size}px)`);
    if (matches === null) checkMatch(mq);

    mq.addEventListener('change', checkMatch);

    return () => {
      mq.removeEventListener('change', checkMatch);
    };
  }, []);

  return matches;
};
