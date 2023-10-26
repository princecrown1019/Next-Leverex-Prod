import { ForwardedRef, RefObject, useEffect, useRef } from 'react';

export const useCombinedRef = <E extends Element = Element, T = RefObject<E> | ForwardedRef<E>>(ref: T) => {
  const targetRef = useRef<E>(null);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref.current = targetRef.current;
    }
  }, []);

  return targetRef;
};
