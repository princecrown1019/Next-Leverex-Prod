import React, { FC } from 'react';

import { LeverageComponent } from '~/components/Leverage/LeverageComponent';

import style from './style.module.scss';

type Props = {
  leverage: number;
};

export const TradeDataLeverageView: FC<Props> = ({ leverage }) => (
  <LeverageComponent className={style.tradeDataLeverage} value={leverage} />
);
