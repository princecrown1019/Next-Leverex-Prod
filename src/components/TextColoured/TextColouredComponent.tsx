import React, { FC, ReactNode, ReactText } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  positive: boolean;
  visible: boolean;
  children: ReactText | ReactNode;
};

export const TextColouredComponent: FC<Props> = ({ className, visible, positive, children }) => {
  const classNameColoured = positive ? style.colouredTextPositive : style.colouredTextNegative;

  return <span className={clsx(className, visible && classNameColoured)}>{children}</span>;
};
