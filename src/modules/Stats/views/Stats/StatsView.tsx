import React, { FC, RefObject } from 'react';

import clsx from 'clsx';

import { ValueBlankComponent } from '~/components/ValueBlank/ValueBlankComponent';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { ChangeArrowComponent } from '~/components/ChangeArrow/ChangeArrowComponent';
import { TextGradientComponent } from '~/components/TextGradient/TextGradientComponent';
import { StatsItemComponent } from '~/modules/Stats/components/StatsItem/StatsItemComponent';
import { LoadingSocketWrapperComponent } from '~/components/LoadingSocketWrapper/LoadingSocketWrapperComponent';
import { Currency, Ticker } from '~/types/currencyTypes';
import { CurrencySymbolComponent } from '~/components/CurrencySymbol/CurrencySymbolComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  countDownRef: RefObject<HTMLSpanElement>;
  lastCutOffPrice: number;
  liveCutOffPrice: number;
  currency: Currency;
  ticker: Ticker;
  loading: boolean;
  cutOffChange: number;
  dailyVolume: number;
  openInterest: number;
};

export const StatsView: FC<Props> = ({
  className,
  countDownRef,
  lastCutOffPrice,
  liveCutOffPrice,
  ticker,
  loading,
  currency,
  cutOffChange,
  dailyVolume,
  openInterest
}) => (
  <LoadingSocketWrapperComponent className={clsx(style.stats, className)} visible={loading}>
    <StatsItemComponent label="Last Cut-Off Price">
      <ValueBlankComponent before={<CurrencySymbolComponent currency={currency} />}>
        {lastCutOffPrice}
      </ValueBlankComponent>
    </StatsItemComponent>

    <StatsItemComponent className={style.statsItemIndexPrice} label="Index Price">
      <TextGradientComponent positive={liveCutOffPrice > lastCutOffPrice} visible={!!liveCutOffPrice}>
        <ValueBlankComponent before={<CurrencySymbolComponent currency={currency} />}>
          {liveCutOffPrice}
        </ValueBlankComponent>
      </TextGradientComponent>
    </StatsItemComponent>

    <StatsItemComponent label="Change since cut off">
      <ChangeArrowComponent
        className={style.changeArrow}
        positive={cutOffChange > 0}
        visible={!!cutOffChange}
        hideIfInvisible
        gradient
      />
      <TextGradientComponent positive={cutOffChange > 0} visible={!!cutOffChange}>
        <ValueComponent after="%" abs>
          {cutOffChange}
        </ValueComponent>
      </TextGradientComponent>
    </StatsItemComponent>

    <StatsItemComponent label={`24 hour volume (${ticker})`}>
      <ValueBlankComponent fix={8}>{dailyVolume}</ValueBlankComponent>
    </StatsItemComponent>

    <StatsItemComponent label={`Open Interest (${ticker})`}>
      <ValueBlankComponent fix={8}>{openInterest}</ValueBlankComponent>
    </StatsItemComponent>

    <StatsItemComponent label="Time To Cut-Off" ref={countDownRef}>
      0h 0m 0s
    </StatsItemComponent>
  </LoadingSocketWrapperComponent>
);
