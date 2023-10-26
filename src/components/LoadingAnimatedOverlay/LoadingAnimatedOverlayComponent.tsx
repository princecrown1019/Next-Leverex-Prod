import React, { FC, RefObject, useEffect } from 'react';

import clsx from 'clsx';

import { useDebounce } from '~/hooks/Debounce/useDebounce';

import style from './style.module.scss';

export type Props = {
  className?: string;
  visible?: boolean;
  debounced?: number;
  parentRef?: RefObject<HTMLDivElement>;
};

export const LoadingAnimatedOverlayComponent: FC<Props> = ({ className, visible, debounced, parentRef }) => {
  const debouncedVisible = useDebounce(visible, debounced ?? 500);

  useEffect(() => {
    if (!parentRef?.current) return;

    parentRef.current.classList.toggle(style.loadingAnimatedOverlayParentVisible, debouncedVisible || visible);
  }, [debouncedVisible || visible]);

  return visible || debouncedVisible ? (
    <aside
      className={clsx(style.loadingAnimatedOverlayContainer, !visible && style.loadingAnimatedOverlayContainerLoaded)}
    >
      <div className={clsx(style.loadingAnimatedOverlay, className)} />
    </aside>
  ) : null;
};
