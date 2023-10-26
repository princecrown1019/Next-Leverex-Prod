import React, { FC, ReactNode } from 'react';

import { Currency, Ticker } from '~/types/currencyTypes';
import { LoadingWrapperComponent } from '~/components/LoadingWrapper/LoadingWrapperComponent';
import { EmptyWrapperComponent } from '~/components/EmptyWrapper/EmptyWrapperComponent';
import { PositionsTableHeaderComponent } from '~/modules/Positions/components/TableHeader/TableHeaderComponent';

export type Props = {
  loggedIn: null | boolean;
  currency: Currency;
  ticker: Ticker;
  loading: boolean;
  empty: boolean;
  children: ReactNode;
};

export const OpenPositionsView: FC<Props> = ({ empty, loading, loggedIn, currency, ticker, children }) => (
  <LoadingWrapperComponent visible={loading}>
    <EmptyWrapperComponent visible={empty} message="You have no open positions">
      <PositionsTableHeaderComponent currency={currency} ticker={ticker} />
      {loggedIn && children}
    </EmptyWrapperComponent>
  </LoadingWrapperComponent>
);
