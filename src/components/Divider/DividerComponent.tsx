import React, { FC } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  vertical?: boolean;
};

export const DividerComponent: FC<Props> = ({ className, vertical }) => (
  <div className={clsx(style.divider, vertical ? style.dividerVertical : style.dividerHorizontal, className)} />
);
