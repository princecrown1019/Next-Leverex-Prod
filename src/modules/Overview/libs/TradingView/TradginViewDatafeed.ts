import { PRODUCT_TYPES } from '~/constants/productConstants';
import { selectDynamicProductLiveCutOffPrice } from '~/store/Market/selectors';
import { selectDynamicProductDailyVolume } from '~/store/Stats/selectors';
import {
  selectPriceChartLastBar,
  selectPriceChartLastTwoBars,
  selectPriceChartBars,
  selectPriceChartHasNext,
  selectPriceChartInterval,
  selectPriceChartCandlesLoading,
  selectPriceChartNextBarTimestamp,
  selectPriceChartFirstBar
} from '~/store/PriceChart/selectors';
import {
  HistoryCallback,
  LibrarySymbolInfo,
  OnReadyCallback,
  ResolveCallback,
  PeriodParams,
  ResolutionString,
  SubscribeBarsCallback
} from '~/libs/TradingView';
import { Bar } from '~/libs/TradingView/datafeed-api';
import { ProductType } from '~/types/productTypes';

import { DatafeedConfig, FetchDataCallback, GetState, SubscribeStore, Subscription } from './TradingViewTypes';

const INTERVAL_TIMES = [60_000, 300_000, 900_000, 1_800_000, 3_600_000, 86_400_000, 604_800_000];

const getSymbolInfo = (productName: string, resolutions: string[], mobile?: boolean): LibrarySymbolInfo => ({
  ticker: productName,
  name: productName,
  description: productName,
  type: 'crypto',
  session: '24x7',
  timezone: 'Etc/UTC',
  exchange: '',
  minmov: 0.5,
  minmove2: 0.5,
  pricescale: 2,
  fractional: true,
  has_intraday: true,
  has_weekly_and_monthly: false,
  supported_resolutions: resolutions as ResolutionString[],
  volume_precision: 8,
  has_no_volume: mobile,
  data_status: 'streaming',
  full_name: productName,
  listed_exchange: 'Leverex',
  format: 'price'
});

export class TradingViewDatafeed {
  private readonly getStore: GetState;
  private readonly subscribeStore: SubscribeStore;
  private readonly loadCandles: FetchDataCallback;
  private readonly loadLastTwoCandles: FetchDataCallback;
  private readonly resolutions: string[];
  private readonly symbol: string;
  private readonly mobile?: boolean;

  private skipLoad = true;

  private removeMarketSubscription?: Subscription;
  private removeStatsSubscription?: Subscription;
  private removeIntervalSubscription?: null | Subscription;
  private removeRealTimeCandlesSubscription?: null | Subscription;

  private lastDailyVolume = 0;
  private lastBarsCache: { [P in ProductType]?: Bar } = {};
  private candlesInterval: { [P in ProductType]?: NodeJS.Timeout } = {};
  private candlesTimeout: { [P in ProductType]?: NodeJS.Timeout } = {};
  private updateLastBarCallbacks: { [P in ProductType]?: SubscribeBarsCallback } = {};

  constructor({ resolutions, store, loadLastTwoCandles, loadCandles, symbol, mobile }: DatafeedConfig) {
    this.getStore = store.getState;
    this.subscribeStore = store.subscribe;
    this.loadCandles = loadCandles;
    this.loadLastTwoCandles = loadLastTwoCandles;

    this.resolutions = resolutions;
    this.symbol = symbol;
    this.mobile = mobile;
  }

  public onReady(callback: OnReadyCallback) {
    setTimeout(() => {
      callback(getSymbolInfo(this.symbol, this.resolutions, this.mobile));
    }, 0);
  }

  public searchSymbols() {
    return null;
  }

  public resolveSymbol(symbol: string, resolveCallback: ResolveCallback) {
    setTimeout(() => {
      resolveCallback(getSymbolInfo(symbol, this.resolutions, this.mobile));
    }, 0);
  }

  public changeSymbol = (symbol: string) => {
    const productType = PRODUCT_TYPES[symbol];

    this.unsubscribeFromUpdates();

    this.subscribeLastPriceUpdates(productType);
    this.subscribeVolumeUpdates(productType);
    this.subscribeTickUpdates(productType);
  };

  public getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    period: PeriodParams,
    historyCallback: HistoryCallback
  ) {
    const hasNext = this.checkNext();
    const interval = this.getInterval();
    const firstBar = this.getFirstBar();
    const loading = this.getLoading();
    const nextInterval = this.resolutions.indexOf(resolution);
    const skip = this.skipLoad && !(interval === 0 && nextInterval === 4);

    if (skip) {
      this.skipLoad = false;
    }

    // Return if there is no more data for the interval.
    if (loading || (nextInterval === interval && this.checkProducts(symbolInfo.name) && !hasNext) || skip) {
      historyCallback([], { noData: true });
      return;
    }

    if (period.firstDataRequest) {
      this.unsubscribeBars();
    }

    this.loadCandles(this.getInterval(resolution));

    this.removeIntervalSubscription = this.subscribeStore(() => {
      const bars = this.getAllBars();

      if ((!bars[0]?.time || firstBar?.time === bars[0]?.time) && firstBar?.productType === bars[0]?.productType)
        return;

      this.removeIntervalSubscription?.();
      this.removeIntervalSubscription = null;

      historyCallback(bars);
    });
  }

  public subscribeBars(symbol: LibrarySymbolInfo, resolution: ResolutionString, updateCallback: SubscribeBarsCallback) {
    if (this.skipLoad) return;

    const productType = PRODUCT_TYPES[symbol.name];

    this.updateLastBarCallbacks[productType] = updateCallback;

    const lastBar = this.getLastBar();
    if (!lastBar) return;

    this.lastBarsCache[lastBar.productType] = lastBar;

    this.setIntervalTimeout(productType, resolution);
  }

  public unsubscribeBars() {}

  /*
   * Private
   */

  private unsubscribeFromUpdates() {
    this.removeMarketSubscription?.();
    this.removeStatsSubscription?.();
    this.removeRealTimeCandlesSubscription?.();

    for (const [, interval] of Object.entries(this.candlesInterval)) {
      clearInterval(interval);
    }
  }

  private updateLastBar(productType: ProductType, bar: Bar) {
    this.lastBarsCache[productType] = bar;
    this.updateLastBarCallbacks[productType]?.(bar);
  }

  private subscribeLastPriceUpdates(productType: ProductType) {
    const lastLiveCutOffPrice = this.getLiveCutOffPrice(productType);
    if (!lastLiveCutOffPrice) return;

    this.removeMarketSubscription = this.subscribeStore(() => {
      const cachedLastBar = this.lastBarsCache[productType];
      if (!cachedLastBar) return;

      const { low, high } = cachedLastBar;

      const indexPrice = this.getLiveCutOffPrice(productType);
      if (indexPrice === cachedLastBar.close) return;

      const newLastBar = {
        ...cachedLastBar,
        close: indexPrice,
        low: Math.min(indexPrice, low),
        high: Math.max(indexPrice, high)
      };

      this.lastBarsCache[productType] = newLastBar;
      this.updateLastBarCallbacks[productType]?.(newLastBar);
    });
  }

  private subscribeVolumeUpdates(productType: ProductType) {
    this.lastDailyVolume = this.getDailyVolume(productType);

    this.removeStatsSubscription = this.subscribeStore(() => {
      const cachedLastBar = this.lastBarsCache[productType];
      if (cachedLastBar?.volume === undefined) return;

      const newDailyVolume = this.getDailyVolume(productType);
      if (newDailyVolume === this.lastDailyVolume) return;

      const volume = newDailyVolume - this.lastDailyVolume + cachedLastBar.volume;
      if (volume < 0) return;

      this.lastDailyVolume = newDailyVolume;

      this.updateLastBar(productType, { ...cachedLastBar, volume });
    });
  }

  private subscribeTickUpdates(productType: ProductType) {
    const lastBar = this.getLastBar();
    if (!lastBar) return;

    this.removeRealTimeCandlesSubscription = this.subscribeStore(() => {
      const cachedLastBar = this.lastBarsCache[productType];
      if (!cachedLastBar) return;

      const [prevBar, bar] = this.getLastTwoBars();

      if (
        !bar ||
        bar.productType !== lastBar.productType ||
        bar.productType !== productType ||
        bar.time === lastBar.time ||
        cachedLastBar.time === bar.time
      )
        return;

      this.updateLastBar(productType, prevBar);
      this.updateLastBar(productType, bar);
    });
  }

  private getLiveCutOffPrice(productType: ProductType) {
    return selectDynamicProductLiveCutOffPrice(this.getStore(), productType);
  }

  private getDailyVolume(productType: ProductType) {
    return selectDynamicProductDailyVolume(this.getStore(), productType);
  }

  private checkProducts(symbolInfoName: string) {
    return this.getProductType() === PRODUCT_TYPES[symbolInfoName];
  }

  private getProductType() {
    return this.getLastBar()?.productType;
  }

  private getLoading() {
    return selectPriceChartCandlesLoading(this.getStore());
  }

  private getAllBars() {
    return selectPriceChartBars(this.getStore());
  }

  private getInterval(resolution?: string) {
    return resolution ? this.resolutions.indexOf(resolution) : selectPriceChartInterval(this.getStore());
  }

  private checkNext() {
    return selectPriceChartHasNext(this.getStore());
  }

  private getFirstBar() {
    return selectPriceChartFirstBar(this.getStore());
  }

  private getLastBar() {
    return selectPriceChartLastBar(this.getStore());
  }

  private getLastTwoBars() {
    return selectPriceChartLastTwoBars(this.getStore());
  }

  private getIntervalTime(resolution: string) {
    const idx = this.resolutions.indexOf(resolution);
    if (idx < 0) return null;

    return INTERVAL_TIMES[idx];
  }

  private setIntervalTimeout(productType: ProductType, resolution: string) {
    clearTimeout(this.candlesTimeout[productType]!);
    clearInterval(this.candlesInterval[productType]!);

    const intervalTime = this.getIntervalTime(resolution);
    if (!intervalTime) return;

    const nextCandleTimestamp = selectPriceChartNextBarTimestamp(this.getStore(), intervalTime);
    if (!nextCandleTimestamp) return;

    const timeout = nextCandleTimestamp - Date.now() + 1000;
    if (timeout < 0) return;

    this.candlesTimeout[productType] = setTimeout(() => {
      this.loadLastTwoCandles(this.getInterval(resolution));

      this.candlesInterval[productType] = setInterval(() => {
        this.loadLastTwoCandles(this.getInterval(resolution));
      }, intervalTime);
    }, timeout);
  }
}
