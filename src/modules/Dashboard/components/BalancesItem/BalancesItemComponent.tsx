import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { LabelComponent } from '~/components/Label/LabelComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  label: string;
  children: ReactNode | ReactNode[];
};

export const BalancesItemComponent: FC<Props> = ({ className, label, children }) => (
  <div className={clsx(style.balancesItem, className)}>
    <LabelComponent className={style.balancesItemLabel}>{label}</LabelComponent>
    <span className={style.balancesItemValue}>{children}</span>
  </div>
);
