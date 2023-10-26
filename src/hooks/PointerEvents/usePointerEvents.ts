import { useCallback } from 'react';

export const usePointerEvents = () => {
  const disable = useCallback(() => {
    document.body.style.pointerEvents = 'none';
  }, []);

  const enable = useCallback(() => {
    document.body.style.pointerEvents = '';
  }, []);

  return { enable, disable };
};
