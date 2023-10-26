import { useCallback, useEffect } from 'react';

const safeDocument = typeof document !== 'undefined' ? document : null;

export const useDefaultStyles = () => {
  const html = safeDocument?.documentElement;
  const body = safeDocument?.body;

  const applyStyles = useCallback(() => {
    if (!body || !html) return;

    html.style.height = 'unset';
    body.style.height = 'unset';
  }, [html, body]);

  const removeStyles = useCallback(() => {
    if (!body || !body.style || !html) return;

    html.style.height = '';
    body.style.height = '';
  }, [html, body]);

  useEffect(() => {
    applyStyles();

    return removeStyles;
  }, []);
};
