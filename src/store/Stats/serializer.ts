import { toMilliseconds } from '~/services/DateFormat/dateFormatService';
import { fixDecimals } from '~/services/NumberFormat/numberFormatService';

import { LoadDayRes, LoadStatsRes, StatsState } from './types';

export const serializeTradingDay = (
  payload: LoadDayRes
): Pick<StatsState, 'timeToCutOff' | 'nextCutOffAt' | 'lastCutOffPrice'> => ({
  timeToCutOff: { [payload.productType]: toMilliseconds(payload.cutOffAt) - Date.now() },
  nextCutOffAt: { [payload.productType]: toMilliseconds(payload.cutOffAt) },
  lastCutOffPrice: { [payload.productType]: Number(payload.lastCutOffPrice) }
});

export const serializeTradingStats = (payload: LoadStatsRes): Pick<StatsState, 'dailyVolume' | 'openInterest'> => ({
  dailyVolume: { [payload.productType]: Number(payload.dailyVolume) },
  openInterest: { [payload.productType]: Number(payload.openInterest) }
});

export const calculateCutOffChange = (lastCutOffPrice: number, liveCutoffPrice: number) => {
  if (!lastCutOffPrice || !liveCutoffPrice) return 0;

  const change = liveCutoffPrice / lastCutOffPrice;
  const changing = change === Number.POSITIVE_INFINITY ? 1 : change - 1;

  return Number.isNaN(changing) ? 0 : Number(fixDecimals(changing * 100, 2));
};
