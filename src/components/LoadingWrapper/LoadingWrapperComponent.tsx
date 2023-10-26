import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  visible?: boolean;
  children?: ReactNode | ReactNode[];
};

export const LoadingWrapperComponent: FC<Props> = ({ className, visible, children }) => {
  return visible ? (
    <div className={clsx(style.indicatorWrapperContainer, className)}>
      <div className={style.indicatorWrapper} />
    </div>
  ) : (
    <>{children}</>
  );
};
