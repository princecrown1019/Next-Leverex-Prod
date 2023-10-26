import React, { DragEvent, FC, ReactNode, useCallback, useEffect, useRef } from 'react';

import clsx from 'clsx';

import { getLocalStorageItem, setLocalStorageItem } from '~/services/LocalStorage/localStorageService';
import { usePointerEvents } from '~/hooks/PointerEvents/usePointerEvents';

import style from './style.module.scss';

type Props = {
  className?: string;
  uniqueId?: string;
  top?: boolean;
  children: ReactNode;
};

export const ResizableComponent: FC<Props> = ({ className, top, uniqueId, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const localStorageKey = uniqueId ? `${uniqueId}:${top ? 'height' : 'width'}` : null;

  const pointerEvents = usePointerEvents();

  useEffect(() => {
    if (!localStorageKey || !ref.current) return;

    const height = getLocalStorageItem<number>(localStorageKey);
    if (!height) return;

    ref.current.style.height = `${height}px`;
  }, []);

  const handleDragStart = useCallback(() => {
    if (!ref.current?.parentElement) return;

    ref.current.parentElement.style.position = 'unset';
  }, []);

  const handleDrag = useCallback(({ clientY }: DragEvent) => {
    if (!ref.current || !clientY) return;

    pointerEvents.disable();
    ref.current.style.height = `${ref.current.clientHeight + (ref.current.offsetTop - clientY)}px`;
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!ref.current || !localStorageKey) return;

    if (ref.current?.parentElement) {
      ref.current.parentElement.style.position = 'relative';
    }

    pointerEvents.enable();
    setLocalStorageItem(localStorageKey, ref.current.clientHeight);
  }, []);

  return (
    <div className={clsx(style.resizable, className)} ref={ref}>
      <span
        className={clsx(style.draggable, top && style.draggableTop)}
        draggable="true"
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      />
      <span className={clsx(style.draggableIcon, top && style.draggableIconTop)} draggable="false">
        <span className={style.dot} />
        <span className={style.dot} />
        <span className={style.dot} />
      </span>
      {children}
    </div>
  );
};
