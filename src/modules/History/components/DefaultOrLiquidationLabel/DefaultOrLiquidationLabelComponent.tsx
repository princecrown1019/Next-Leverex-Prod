import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  liquidated: boolean;
  defaulted: boolean;
  children?: ReactNode;
};

export const DefaultOrLiquidationLabelComponent: FC<Props> = ({ liquidated, defaulted, children }) => {
  const classNameDefaulted = defaulted && style.tradesHistoryDefaulted;
  const classNameLiquidated = liquidated && style.tradesHistoryLiquidated;

  return defaulted || liquidated ? (
    <span className={clsx(style.tradesHistoryLiquidationOrDefault, classNameDefaulted, classNameLiquidated)}>
      {children || <>*{defaulted ? 'Defaulted' : 'Liquidated'}</>}
    </span>
  ) : null;
};
