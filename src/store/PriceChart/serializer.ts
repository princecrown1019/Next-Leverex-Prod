import { ChartCandle } from '~/types/chartTypes';
import { ProductType } from '~/types/productTypes';
import { toMilliseconds } from '~/services/DateFormat/dateFormatService';

export const serializeCandle = (candle: ChartCandle<string>, productType: ProductType): ChartCandle<number> => {
  const timestamp = toMilliseconds(candle.timestamp);

  return {
    ...candle,
    timestamp,
    open: Number(candle.open),
    high: Number(candle.high),
    low: Number(candle.low),
    close: Number(candle.close),
    trades: Number(candle.trades),
    volume: Number(candle.volume),
    time: timestamp,
    productType
  };
};

export const serializeCandles = (candles: ChartCandle<string>[], productType: ProductType): ChartCandle<number>[] => {
  return candles.map((candle) => serializeCandle(candle, productType));
};
