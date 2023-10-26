import { useCallback, useRef } from 'react';

export const useInputFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  const focus = useCallback(() => {
    ref.current?.focus();
  }, []);

  const blur = useCallback(() => {
    ref.current?.blur();
  }, []);

  return { ref, focus, blur };
};
