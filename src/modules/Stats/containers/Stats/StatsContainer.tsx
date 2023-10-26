import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentProductLiveCutOffPrice, selectProduct } from '~/store/Market/selectors';
import {
  selectCurrentProductCutOffChange,
  selectCurrentProductDailyVolume,
  selectCurrentProductLastCutOffPrice,
  selectCurrentProductNextCutOffTime,
  selectCurrentProductOpenInterest,
  selectSessionDataLoading,
  selectTradingStatsLoading
} from '~/store/Stats/selectors';
import { useCountDownRef } from '~/hooks/CountDownRef/useCountDownRef';
import { StatsView, Props as ViewProps } from '~/modules/Stats/views/Stats/StatsView';
import { getCurrencySymbol, toProductPair } from '~/services/Product/productService';
import { separateAndFix } from '~/services/NumberFormat/numberFormatService';

type Props = Pick<ViewProps, 'className'>;

export const StatsContainer: FC<Props> = ({ className }) => {
  const { ticker, currency } = useSelector(selectProduct);
  const lastCutOffPrice = useSelector(selectCurrentProductLastCutOffPrice);
  const liveCutOffPrice = useSelector(selectCurrentProductLiveCutOffPrice);
  const cutOffChange = useSelector(selectCurrentProductCutOffChange);
  const openInterest = useSelector(selectCurrentProductOpenInterest);
  const dailyVolume = useSelector(selectCurrentProductDailyVolume);
  const nextCutOffTime = useSelector(selectCurrentProductNextCutOffTime);
  const loadingTradingStats = useSelector(selectTradingStatsLoading);
  const loadingTradingDay = useSelector(selectSessionDataLoading);

  const countDownRef = useCountDownRef(nextCutOffTime);

  useEffect(() => {
    const formattedPrice = liveCutOffPrice
      ? `${getCurrencySymbol(currency)}${separateAndFix(liveCutOffPrice, 2)}`
      : 'N/A';

    const formattedChange = `(${cutOffChange > 0 ? '+' : ''}${separateAndFix(cutOffChange)}%)`;

    document.title = `${formattedPrice} ${formattedChange} ${toProductPair(ticker, currency)} Exchange`;
  }, [liveCutOffPrice, currency, ticker]);

  return (
    <StatsView
      loading={!liveCutOffPrice ? loadingTradingDay || loadingTradingStats : false}
      className={className}
      countDownRef={countDownRef}
      ticker={ticker}
      currency={currency}
      lastCutOffPrice={lastCutOffPrice}
      liveCutOffPrice={liveCutOffPrice}
      cutOffChange={cutOffChange}
      dailyVolume={dailyVolume}
      openInterest={openInterest}
    />
  );
};
