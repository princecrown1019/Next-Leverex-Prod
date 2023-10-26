import React, { FC, ReactNode, ReactText } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  children: ReactText | ReactNode | ReactNode[];
};

export const ModalPitchComponent: FC<Props> = ({ className, children }) => (
  <p className={clsx(style.modalSubHeadline, className)}>{children}</p>
);
