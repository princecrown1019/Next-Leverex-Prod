import { ChartingLibraryWidgetOptions, ResolutionString, widget as Widget } from '~/libs/TradingView';
import { toProductPair } from '~/services/Product/productService';
import { Currency, Ticker } from '~/types/currencyTypes';

import { ChartConfig } from './TradingViewTypes';
import { TradingViewDatafeed } from './TradginViewDatafeed';

const LIBRARY_PATH = '/static/tradingview/lib/';
const LIBRARY_CSS_PATH = '/static/tradingview/tv.css';
const ENABLED_FEATURES: string[] = ['hide_left_toolbar_by_default'];
const DISABLED_FEATURES = [
  'use_localstorage_for_settings',
  // 'left_toolbar',
  // 'header_widget',
  'popup_hints',
  'header_symbol_search',
  // 'header_fullscreen_button',
  'header_compare',
  // 'header_settings',
  'header_indicators',
  'symbol_search_hot_key',
  // 'header_undo_redo',
  'control_bar',
  'symbol_info',
  'go_to_date',
  'adaptive_logo',
  'source_selection_markers',
  'scales_date_format',
  'chart_property_page_scales',
  'main_series_scale_menu',
  'scales_context_menu',
  'pane_context_menu',
  'control_bar',
  // 'header_screenshot',
  // 'timeframes_toolbar',
  'legend_context_menu',
  'edit_buttons_in_legend',
  'display_market_status'
];
const DISABLED_FEATURES_MOBILE = ['left_toolbar', 'timeframes_toolbar'];
const DISABLED_FEATURES_DESKTOP = ['volume_force_overlay'];
const RESOLUTIONS = ['1', '5', '15', '30', '60', '1D', '1W'];

const getOptions = (config: ChartConfig, datafeed: TradingViewDatafeed): ChartingLibraryWidgetOptions => {
  const { container, symbol, mobile } = config;

  return {
    interval: '1D' as ResolutionString,
    symbol,
    fullscreen: false,
    autosize: true,
    enabled_features: ENABLED_FEATURES,
    disabled_features: [...DISABLED_FEATURES, ...(mobile ? DISABLED_FEATURES_MOBILE : DISABLED_FEATURES_DESKTOP)],
    container,
    datafeed,
    library_path: LIBRARY_PATH,
    locale: 'en',
    theme: 'Dark',
    time_frames: [
      { text: '1y', resolution: '1W' as ResolutionString, description: '1 Year', title: '1y' },
      { text: '3m', resolution: '1D' as ResolutionString, description: '3 Month', title: '3m' },
      { text: '1m', resolution: '1D' as ResolutionString, description: '1 Month', title: '1m' },
      { text: '5d', resolution: '120' as ResolutionString, description: '5 Days', title: '5d' },
      { text: '1d', resolution: '30' as ResolutionString, description: '1 Day', title: '1d' }
    ],
    custom_css_url: LIBRARY_CSS_PATH,
    timeframe: '120D',
    loading_screen: {
      backgroundColor: '#21212E',
      foregroundColor: '#21212E'
    },
    toolbar_bg: '#21212E',
    studies_overrides: {
      'volume.volume.color.0': 'rgba(255, 64, 67, 0.25)',
      'volume.volume.color.1': 'rgba(4, 210, 0, 0.25)'
    },
    overrides: {
      volumePaneSize: 'medium',

      'paneProperties.backgroundType': 'solid',
      'paneProperties.backgroundGradientStartColor': '#21212E',
      'paneProperties.backgroundGradientEndColor': '#21212E',
      'paneProperties.background': '#21212E',
      'paneProperties.vertGridProperties.color': 'rgb(59, 59, 78, 0.2)', // border color with opacity
      'paneProperties.horzGridProperties.color': 'rgb(59, 59, 78, 0.2)', // border color with opacity
      'paneProperties.crossHairProperties.color': '#636383',
      'paneProperties.crossHairProperties.width': 1,
      'paneProperties.crossHairProperties.style': 3,

      // 'scalesProperties.textColor': palette.text.secondary,
      'scalesProperties.backgroundColor': '#21212E',

      // Candles styles
      // 'mainSeriesProperties.showPriceLine': false,
      'mainSeriesProperties.minTick': '100000',
      'mainSeriesProperties.candleStyle.upColor': '#25D160',
      'mainSeriesProperties.candleStyle.downColor': '#FF2D58',
      'mainSeriesProperties.candleStyle.drawWick': true,
      'mainSeriesProperties.candleStyle.drawBorder': true,
      'mainSeriesProperties.candleStyle.borderColor': '#378658',
      'mainSeriesProperties.candleStyle.borderUpColor': '#25D160',
      'mainSeriesProperties.candleStyle.borderDownColor': '#FF2D58',
      'mainSeriesProperties.candleStyle.wickUpColor': '#25D160',
      'mainSeriesProperties.candleStyle.wickDownColor': '#FF2D58',
      'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,

      // Hollow Candles styles
      'mainSeriesProperties.hollowCandleStyle.upColor': '#25D160',
      'mainSeriesProperties.hollowCandleStyle.downColor': '#FF2D58',
      'mainSeriesProperties.hollowCandleStyle.borderColor': '#378658',
      'mainSeriesProperties.hollowCandleStyle.borderUpColor': '#25D160',
      'mainSeriesProperties.hollowCandleStyle.borderDownColor': '#FF2D58',
      'mainSeriesProperties.hollowCandleStyle.wickColor': '#737375',

      // Heikin Ashi styles
      'mainSeriesProperties.haStyle.upColor': '#25D160',
      'mainSeriesProperties.haStyle.downColor': '#FF2D58',
      'mainSeriesProperties.haStyle.drawWick': true,
      'mainSeriesProperties.haStyle.drawBorder': true,
      'mainSeriesProperties.haStyle.borderColor': '#378658',
      'mainSeriesProperties.haStyle.borderUpColor': '#25D160',
      'mainSeriesProperties.haStyle.borderDownColor': '#FF2D58',
      'mainSeriesProperties.haStyle.wickColor': '#737375',
      'mainSeriesProperties.haStyle.barColorsOnPrevClose': false,

      // Bar styles
      'mainSeriesProperties.barStyle.upColor': '#25D160',
      'mainSeriesProperties.barStyle.downColor': '#FF2D58',
      'mainSeriesProperties.barStyle.barColorsOnPrevClose': false,

      // Line styles
      'mainSeriesProperties.lineStyle.color': '#0085FF',
      'mainSeriesProperties.lineStyle.linewidth': 2,
      'mainSeriesProperties.lineStyle.priceSource': 'close',

      // Area styles
      'mainSeriesProperties.areaStyle.color1': 'rgba(0, 133, 255, 0.05)',
      'mainSeriesProperties.areaStyle.color2': '#0085FF',
      'mainSeriesProperties.areaStyle.linecolor': '#0085FF',
      'mainSeriesProperties.areaStyle.linewidth': 2,
      'mainSeriesProperties.areaStyle.priceSource': 'close',

      // Baseline styles
      'mainSeriesProperties.baselineStyle.baselineColor': 'rgba( 117, 134, 150, 1)',
      'mainSeriesProperties.baselineStyle.topFillColor1': 'rgba(4, 210, 0, 0.25)',
      'mainSeriesProperties.baselineStyle.topFillColor2': 'rgba(4, 210, 0, 0.05)',
      'mainSeriesProperties.baselineStyle.bottomFillColor1': 'rgba(255, 64, 67, 0.05)',
      'mainSeriesProperties.baselineStyle.bottomFillColor2': 'rgba(255, 64, 67, 0.25)',
      'mainSeriesProperties.baselineStyle.topLineColor': '#25D160',
      'mainSeriesProperties.baselineStyle.bottomLineColor': '#FF2D58',
      'mainSeriesProperties.baselineStyle.topLineWidth': 2,
      'mainSeriesProperties.baselineStyle.bottomLineWidth': 2,
      'mainSeriesProperties.baselineStyle.priceSource': 'close',
      'mainSeriesProperties.baselineStyle.transparency': 50,
      'mainSeriesProperties.baselineStyle.baseLevelPercentage': 50,

      // Hi-Lo style
      'mainSeriesProperties.hiloStyle.color': '#0085FF',
      'mainSeriesProperties.hiloStyle.showBorders': true,
      'mainSeriesProperties.hiloStyle.borderColor': '#0085FF',
      'mainSeriesProperties.hiloStyle.showLabels': true,
      'mainSeriesProperties.hiloStyle.labelColor': '#0085FF',
      'mainSeriesProperties.hiloStyle.fontSize': 7
    }
  };
};

export class TradingViewLib extends Widget {
  private readonly initialInterval?: string;
  private readonly changeSymbol: (symbol: string) => void;

  private symbol?: string;

  constructor(config: ChartConfig) {
    const symbol = toProductPair(config.ticker, config.currency);
    const datafeed = new TradingViewDatafeed({ ...config, symbol, resolutions: RESOLUTIONS });
    const options = getOptions({ ...config, symbol }, datafeed);

    super(options);

    this.initialInterval = config.initialInterval;
    this.symbol = options.symbol;
    this.changeSymbol = datafeed.changeSymbol;
  }

  public async setInitialInterval(cb: () => void) {
    if (!this.symbol) return;

    super.setSymbol(this.symbol, this.initialInterval as ResolutionString, () => {
      this.changeSymbol(this.symbol!);
      setTimeout(cb, 100);
    });
  }

  public setProduct(ticker: Ticker, currency: Currency, interval: number) {
    this.symbol = toProductPair(ticker, currency);

    super.setSymbol(this.symbol, RESOLUTIONS[interval] as ResolutionString, () => {
      this.changeSymbol(this.symbol!);
    });
  }
}
