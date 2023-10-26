import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  invisibleClassName?: string;
  positive: boolean;
  visible: boolean;
  children: ReactNode;
};

export const TextGradientComponent: FC<Props> = ({ className, invisibleClassName, visible, positive, children }) => {
  const classNameGradient = visible
    ? [style.gradientTextVisible, positive ? style.gradientTextLong : style.gradientTextShort]
    : [invisibleClassName];

  return <span className={clsx(style.gradientText, className, ...classNameGradient)}>{children}</span>;
};
