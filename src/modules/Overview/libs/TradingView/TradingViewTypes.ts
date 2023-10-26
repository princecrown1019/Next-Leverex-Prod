import { Store } from '@reduxjs/toolkit';

import { Currency, Ticker } from '~/types/currencyTypes';
import { AppState } from '~/store/types';
import { Bar, HistoryMetadata } from '~/libs/TradingView';
import { ProductType } from '~/types/productTypes';

export type AppStore = Store<AppState>;
export type GetState = () => AppState;

export type LastBars = { [P in ProductType]?: Bar };

export type SubscribeStore = (listener: () => void) => () => void;
export type Subscription = () => void;

export type FetchDataCallback = (resolution: number) => void;

export type ChartConfig = {
  container: HTMLDivElement;
  initialInterval: string;
  mobile?: boolean;
  ticker: Ticker;
  symbol?: string;
  currency: Currency;
  store: AppStore;
  loadCandles: FetchDataCallback;
  loadLastTwoCandles: FetchDataCallback;
};

export type DatafeedConfig = Omit<ChartConfig, 'container' | 'initialInterval' | 'ticker' | 'currency'> & {
  resolutions: string[];
  symbol: string;
};

export type GetBarsResult = {
  bars: Bar[];
  meta: HistoryMetadata;
};
