import React, { FC, ReactText } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  children: ReactText;
};

export const ModalHeadlineComponent: FC<Props> = ({ className, children }) => (
  <h3 className={clsx(style.modalHeadline, className)}>{children}</h3>
);
