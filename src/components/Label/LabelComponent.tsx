import React, { FC, ReactText } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  htmlFor?: string;
  children: ReactText;
};

export const LabelComponent: FC<Props> = ({ className, htmlFor, children }) => (
  <label className={clsx(style.label, className)} htmlFor={htmlFor}>
    {children}
  </label>
);
