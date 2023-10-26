import React, { FC } from 'react';

import clsx from 'clsx';

import { Currency, Ticker } from '~/types/currencyTypes';
import { ProductPairComponent } from '~/components/ProductPair/ProductPairComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  ticker: Ticker;
  currency: Currency;
  status?: null | boolean;
};

export const SessionHealthView: FC<Props> = ({ className, ticker, currency, status }) => {
  const statusClassName = status ? style.sessionHealthOnline : style.sessionHealthOffline;

  return status == null || status ? null : (
    <div className={clsx(style.sessionHealth, className, statusClassName)}>
      <span className={style.sessionHealthStatus}>
        <ProductPairComponent ticker={ticker} currency={currency} /> session is halted
      </span>
    </div>
  );
};
