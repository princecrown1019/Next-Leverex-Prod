import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '~/store/types';
import { ProductSide } from '~/types/productTypes';
import { selectMarketPrices, selectProduct } from '~/store/Market/selectors';
import { useMarketContext } from '~/modules/Trade/contexts/Market/MarketContext';
import { TradeSideSwitcherView, Props as ViewProps } from '~/modules/Trade/views/SideSwitcher/SideSwitcherView';

type Props = Pick<ViewProps, 'className'>;

export const TradeSideSwitcherContainer: FC<Props> = ({ className }) => {
  const { side, amount, controls } = useMarketContext();

  const { currency } = useSelector(selectProduct);
  const prices = useSelector((state: AppState) => selectMarketPrices(state, amount.amount));

  const long = useMemo(() => side === ProductSide.BUY, [side]);

  return (
    <TradeSideSwitcherView
      className={className}
      currency={currency}
      long={long}
      askPrice={prices.ask}
      bidPrice={prices.bid}
      handleLongClick={controls.setLong}
      handleShortClick={controls.setShort}
    />
  );
};
