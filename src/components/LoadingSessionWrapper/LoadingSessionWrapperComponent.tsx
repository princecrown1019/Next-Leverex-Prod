import React, { FC, ReactNode, useRef } from 'react';

import clsx from 'clsx';

import { LoadingSessionOverlayComponent } from '~/components/LoadingSessionOverlay/LoadingSessionOverlayComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  children: ReactNode | ReactNode[];
};

export const LoadingSessionWrapperComponent: FC<Props> = ({ className, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(style.widget, className)} ref={ref}>
      <LoadingSessionOverlayComponent parentRef={ref} />
      {children}
    </div>
  );
};
