import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  message?: string;
  visible?: boolean;
  children?: ReactNode | ReactNode[];
};

export const EmptyWrapperComponent: FC<Props> = ({ className, visible, message, children }) => {
  return visible ? (
    <div className={clsx(style.emptyWrapper, className)}>
      {message ? <span className={style.emptyWrapperText}>{message}</span> : null}
    </div>
  ) : (
    <>{children}</>
  );
};
