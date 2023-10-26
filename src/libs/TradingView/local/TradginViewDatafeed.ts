import { Store as StoreType, AnyAction } from 'redux';
import { ChartCandle } from '~/types/chartTypes';
import { AppState } from '~/store/types';
import { selectSocketMainConnected } from '~/store/SocketMain/selectors';
import { selectCurrentProductLiveCutOffPrice } from '~/store/Market/selectors';
import { selectCurrentProductDailyVolume } from '~/store/Stats/selectors';
import {
  selectTradesChartCandles,
  selectTradesChartHasNext,
  selectTradesChartInterval,
  selectTradesChartLoading
} from '~/store/Charts/selectors';
import { PRODUCT_TYPES } from '~/constants/productConstants';

import {
  Bar,
  HistoryCallback,
  LibrarySymbolInfo,
  OnReadyCallback,
  ResolveCallback,
  PeriodParams,
  ResolutionString,
  SubscribeBarsCallback,
  HistoryMetadata
} from '..';

export type Store = StoreType<AppState, AnyAction>;
export type GetState = () => AppState;

export type SubscribeStore = (listener: () => void) => () => void;
export type Subscription = () => void;

export type FetchDataCallback = (resolution: string, symbol: string) => void;

export type GetBarsResult = {
  bars: Bar[];
  meta: HistoryMetadata;
};

const getSymbolInfo = (productName: string, resolutions: string[]): LibrarySymbolInfo => ({
  ticker: productName,
  name: productName,
  description: productName,
  type: 'crypto',
  session: '24x7',
  timezone: 'Etc/UTC',
  exchange: '',
  minmov: 1,
  pricescale: 8,
  fractional: true,
  has_intraday: true,
  has_weekly_and_monthly: false,
  supported_resolutions: resolutions as ResolutionString[],
  volume_precision: 8,
  data_status: 'streaming',
  full_name: productName,
  listed_exchange: 'BlockSettle',
  format: 'price'
});

export class TradingViewDataFeed {
  private resolutions: string[];

  private lastDailyVolume = 0;

  private getStore: GetState;
  private subscribeStore: SubscribeStore;

  private removeMarketSubscription?: Subscription;
  private removeStatsSubscription?: Subscription;
  private removeIntervalSubscription?: null | Subscription;

  private fetchDataCallback: FetchDataCallback;

  constructor(symbol: string, resolutions: string[], store: Store, fetchData: FetchDataCallback) {
    this.resolutions = resolutions;
    this.getStore = store.getState;
    this.subscribeStore = store.subscribe;
    this.fetchDataCallback = fetchData;
  }

  public onReady(callback: OnReadyCallback) {
    setTimeout(() => {
      callback({});
    }, 0);
  }

  public searchSymbols() {
    return null;
  }

  public resolveSymbol(symbol: string, resolveCallback: ResolveCallback) {
    setTimeout(() => {
      resolveCallback(getSymbolInfo(symbol, this.resolutions));
    }, 0);
  }

  public getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    period: PeriodParams,
    historyCallback: HistoryCallback
  ) {
    const candles = this.getCandles();
    const hasNext = this.checkNext();
    const interval = this.getInterval();
    const firstCandle = candles[0];
    const loading = this.getLoading();
    const nextInterval = this.resolutions.indexOf(resolution);

    // Return if there is no more data for the interval.
    if (loading || (nextInterval === interval && this.checkProducts(symbolInfo.name) && !hasNext)) {
      historyCallback([], { noData: true });
      return;
    }

    if (this.isSocketConnected()) {
      this.fetchDataCallback(resolution, symbolInfo.name);
    }

    this.removeIntervalSubscription = this.subscribeStore(() => {
      const currentCandles = this.getCandles();

      // if (!currentHasNext) {
      //   historyCallback([], { noData: true });
      //   return;
      // }

      // interval is null initially.
      if (!currentCandles[0]?.date || firstCandle?.date === currentCandles[0]?.date) return;

      this.removeIntervalSubscription?.();
      this.removeIntervalSubscription = null;

      const bars = this.buildBars(currentCandles);
      historyCallback(bars, { noData: false });
    });
  }

  public subscribeBars(_: LibrarySymbolInfo, __: ResolutionString, updateCallback: SubscribeBarsCallback) {
    const lastCandle = this.getLastCandle();
    if (!lastCandle) return;

    const lastLiveCutOffPrice = this.getLiveCutOffPrice();
    if (!lastLiveCutOffPrice) return;

    this.lastDailyVolume = this.getDailyVolume();

    this.removeMarketSubscription = this.subscribeStore(() => {
      const liveCutOffPrice = this.getLiveCutOffPrice();
      if (!liveCutOffPrice || liveCutOffPrice === lastLiveCutOffPrice) return;

      updateCallback({
        ...lastCandle,
        time: lastCandle.timestamp * 1000,
        close: liveCutOffPrice,
        open: lastCandle.open,
        low: Math.min(liveCutOffPrice, lastCandle.low),
        high: Math.max(liveCutOffPrice, lastCandle.high)
      });
    });

    this.removeStatsSubscription = this.subscribeStore(() => {
      const newDailyVolume = this.getDailyVolume();
      if (newDailyVolume === this.lastDailyVolume) return;

      const candle = this.getLastCandle();
      if (!candle) return;

      const volume = newDailyVolume - this.lastDailyVolume + candle.volume;
      this.lastDailyVolume = newDailyVolume;

      updateCallback({ ...candle, time: candle.timestamp * 1000, volume });
    });
  }

  public unsubscribeBars() {
    this.removeMarketSubscription?.();
    this.removeStatsSubscription?.();
  }

  /*
   * Private
   */

  private isSocketConnected() {
    return selectSocketMainConnected(this.getStore());
  }

  private buildBars(items: ChartCandle<number>[]): Bar[] {
    return items.map((item) => ({ ...item, time: item.date }));
  }

  private getLiveCutOffPrice() {
    return selectCurrentProductLiveCutOffPrice(this.getStore());
  }

  private getDailyVolume() {
    return selectCurrentProductDailyVolume(this.getStore());
  }

  private checkProducts(symbolInfoName: string) {
    return this.getProductType() === PRODUCT_TYPES[symbolInfoName];
  }

  private getProductType() {
    return this.getLastCandle()?.productType;
  }

  private getLoading() {
    return selectTradesChartLoading(this.getStore());
  }

  private getCandles() {
    return selectTradesChartCandles(this.getStore());
  }

  private getInterval() {
    return selectTradesChartInterval(this.getStore());
  }

  private checkNext() {
    return selectTradesChartHasNext(this.getStore());
  }

  private getFirstCandle() {
    return this.getCandles()[0] || null;
  }

  private getLastCandle() {
    const candles = this.getCandles();
    if (!candles.length) return null;

    return candles[candles.length - 1];
  }
}
