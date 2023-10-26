import { useCallback, useEffect, useRef } from 'react';

const safeDocument = typeof document !== 'undefined' ? document : null;

export const useDisabledScroll = (option: boolean) => {
  const scrollBlocked = useRef<boolean>();

  const html = safeDocument?.documentElement;
  const body = safeDocument?.body;

  const disableScroll = useCallback(() => {
    if (!body || !body.style || !html || scrollBlocked.current) return;
    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight = Number.parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0;

    html.style.position = 'relative';
    html.style.overflow = 'hidden';
    body.style.position = 'relative';
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    scrollBlocked.current = true;
  }, [html, body]);

  const enableScroll = useCallback(() => {
    if (!body || !body.style || !html || !scrollBlocked.current) return;

    html.style.position = '';
    html.style.overflow = '';
    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';

    scrollBlocked.current = false;
  }, [html, body]);

  useEffect(() => {
    if (option) {
      disableScroll();
    }

    return enableScroll;
  }, [option]);
};
