import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { LabelComponent } from '~/components/Label/LabelComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  label: string;
  children: ReactNode | ReactNode[];
};

export const ProfitLossItemComponent: FC<Props> = ({ className, label, children }) => (
  <div className={clsx(style.profitLossItem, className)}>
    <LabelComponent>{label}</LabelComponent>
    <span className={style.profitLossItemValue}>{children}</span>
  </div>
);
