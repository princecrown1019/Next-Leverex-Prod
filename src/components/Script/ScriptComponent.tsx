import { FC, useEffect, useLayoutEffect, useRef } from 'react';

type Props = {
  src: string;
  onload?: () => void;
  persistant?: boolean;
};

export const ScriptComponent: FC<Props> = ({ src, persistant, onload }) => {
  const scriptRef = useRef<HTMLScriptElement>();

  useLayoutEffect(() => {
    const scripts = [...document.querySelectorAll('script').values()];
    if (scripts.some((script) => script.src === src)) return;

    scriptRef.current = document.createElement('script');
    scriptRef.current.async = false;
    scriptRef.current.src = src;

    if (onload) {
      scriptRef.current?.addEventListener('load', onload);
    }

    document.body.append(scriptRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (persistant) return;

      scriptRef.current?.remove();
    };
  }, []);

  return null;
};
