import React, { FC, ReactNode, useRef } from 'react';

import clsx from 'clsx';

import { LoadingSocketOverlayComponent } from '~/components/LoadingSocketOverlay/LoadingSocketOverlayComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  visible?: boolean;
  children: ReactNode | ReactNode[];
};

export const LoadingSocketWrapperComponent: FC<Props> = ({ className, visible, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(style.widget, className)} ref={ref}>
      <LoadingSocketOverlayComponent visible={visible} parentRef={ref} />
      {children}
    </div>
  );
};
