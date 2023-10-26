import { RefObject, useCallback, useEffect } from 'react';

export const useOutsideClick = <T extends Element>(ref: RefObject<T>, callback: (event: MouseEvent) => void) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      callback(event);
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
};

export const useOutsideClickMultiple = <T extends Element>(
  refs: RefObject<T>[],
  callback: (event: MouseEvent) => void
) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!refs.length || refs.some((ref) => ref.current?.contains(event.target as Node))) return;

      callback(event);
    },
    [refs]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);
};

export const useOutsideClickOptional = <T extends Element>(
  ref: RefObject<T>,
  option: boolean,
  callback: (event: MouseEvent) => void
) => {
  const handleClick = useCallback((event: MouseEvent) => {
    if (!ref.current || ref.current.contains(event.target as Node)) return;

    callback(event);
  }, []);

  useEffect(() => {
    if (option) {
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('click', handleClick);
    }
  }, [option]);
};
