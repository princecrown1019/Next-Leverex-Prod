import React, { FC } from 'react';

import clsx from 'clsx';

import { TextGradientComponent } from '~/components/TextGradient/TextGradientComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { ValueBlankComponent } from '~/components/ValueBlank/ValueBlankComponent';
import { Currency } from '~/types/currencyTypes';
import { CurrencySymbolComponent } from '~/components/CurrencySymbol/CurrencySymbolComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  long: boolean;
  currency: Currency;
  askPrice: number;
  bidPrice: number;
  handleShortClick: () => void;
  handleLongClick: () => void;
};

export const TradeSideSwitcherView: FC<Props> = ({
  className,
  long,
  currency,
  askPrice,
  bidPrice,
  handleShortClick,
  handleLongClick
}) => (
  <div className={clsx(style.marketSideSwitcher, className)}>
    <ButtonComponent
      className={clsx(style.marketSideContainer, !long && style.marketSideContainerShort)}
      withoutRipple
      onClick={handleShortClick}
    >
      <div className={clsx(style.marketSide, !long && style.marketSideShort)}>
        <TextGradientComponent
          className={style.marketSideLabel}
          invisibleClassName={style.marketSideLabelInvisible}
          positive={false}
          visible={!long}
        >
          Sell Short
        </TextGradientComponent>
        <TextGradientComponent className={style.marketSidePrice} positive={false} visible>
          <ValueBlankComponent before={<CurrencySymbolComponent currency={currency} />} placeholder="N/A">
            {bidPrice}
          </ValueBlankComponent>
        </TextGradientComponent>
      </div>
    </ButtonComponent>

    <ButtonComponent
      className={clsx(style.marketSideContainer, long && style.marketSideContainerLong)}
      withoutRipple
      onClick={handleLongClick}
    >
      <div className={clsx(style.marketSide, long && style.marketSideLong)}>
        <TextGradientComponent
          className={style.marketSideLabel}
          invisibleClassName={style.marketSideLabelInvisible}
          positive
          visible={long}
        >
          Buy Long
        </TextGradientComponent>
        <TextGradientComponent className={style.marketSidePrice} positive visible>
          <ValueBlankComponent before={<CurrencySymbolComponent currency={currency} />} placeholder="N/A">
            {askPrice}
          </ValueBlankComponent>
        </TextGradientComponent>
      </div>
    </ButtonComponent>
  </div>
);
