import React, { FC, useCallback, MouseEvent, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectToastsItems } from '~/store/Toasts/selectors';
import { useRemoveToastCommand } from '~/modules/Toasts/commands/RemoveToast/useRemoveToastCommand';
import { useDebounce } from '~/hooks/Debounce/useDebounce';
import { ToastsView } from '~/modules/Toasts/views/Toasts/ToastsView';
import { useOutsideClick } from '~/hooks/OutsideClick/useOutsideClick';

const ANIMATION_DURATION = 200;

export const ToastsContainer: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const toasts = useSelector(selectToastsItems);

  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  const debouncedToasts = useDebounce(toasts, ANIMATION_DURATION);

  const remove = useRemoveToastCommand();

  useEffect(() => {
    const lastToastId = toasts[toasts.length - 1]?.id;
    if (!toasts.length || !lastToastId || visibleIds.includes(lastToastId)) return;

    if (toasts.length > 2) {
      setTimeout(() => {
        setVisibleIds((prevIds) => [...prevIds, lastToastId]);
      }, ANIMATION_DURATION);
    } else {
      setVisibleIds((prevIds) => [...prevIds, lastToastId]);
    }
  }, [toasts.length]);

  const handleToastClose = useCallback(
    ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      setVisibleIds((prevIds) => prevIds.filter((id) => id !== currentTarget.name));

      setTimeout(() => {
        remove(currentTarget.name);
      }, ANIMATION_DURATION);
    },
    [toasts.length]
  );

  const handleOutsideClick = useCallback(() => {
    if (!toasts[0]?.id) return;

    setVisibleIds((prevIds) => prevIds.filter((id) => id !== toasts[0].id));

    setTimeout(() => {
      remove(toasts[0].id);
    }, ANIMATION_DURATION);
  }, [toasts.length]);

  useOutsideClick(containerRef, handleOutsideClick);

  return (
    <ToastsView
      toasts={debouncedToasts}
      visibleIds={visibleIds}
      handleToastClose={handleToastClose}
      containerRef={containerRef}
    />
  );
};
