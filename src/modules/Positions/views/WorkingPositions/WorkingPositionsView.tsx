import React, { FC, ReactNode } from 'react';

import { EmptyWrapperComponent } from '~/components/EmptyWrapper/EmptyWrapperComponent';
import { LoadingWrapperComponent } from '~/components/LoadingWrapper/LoadingWrapperComponent';
import { PositionsTableHeaderComponent } from '~/modules/Positions/components/TableHeader/TableHeaderComponent';
import { Currency, Ticker } from '~/types/currencyTypes';

export type Props = {
  loggedIn: null | boolean;
  currency: Currency;
  ticker: Ticker;
  loading: boolean;
  empty: boolean;
  children: ReactNode;
};

export const WorkingPositionsView: FC<Props> = ({ empty, loading, loggedIn, currency, ticker, children }) => (
  <LoadingWrapperComponent visible={loading}>
    <EmptyWrapperComponent visible={empty} message="You have no working positions">
      <PositionsTableHeaderComponent currency={currency} ticker={ticker} cancel />
      {loggedIn && children}
    </EmptyWrapperComponent>
  </LoadingWrapperComponent>
);
