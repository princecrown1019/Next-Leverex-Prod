import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

export const usePreserveScroll = () => {
  const router = useRouter();

  const scrollPositions = useRef<{ [url: string]: number }>({});
  const isBack = useRef(false);

  useEffect(() => {
    router.beforePopState(() => {
      isBack.current = true;
      return true;
    });

    const onRouteChangeStart = () => {
      if (window.scrollY < window.innerHeight / 2) return;

      scrollPositions.current[router.pathname] = window.scrollY;
    };

    const onRouteChangeComplete = (url: string) => {
      if (isBack.current && scrollPositions.current[url]) {
        window.scroll({ top: scrollPositions.current[url], behavior: 'auto' });
      }

      isBack.current = false;
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);
};
