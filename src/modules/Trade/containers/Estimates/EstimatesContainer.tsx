import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectEstimatedImFee, selectEstimatedImReservation } from '~/store/TradeEstimations/selectors';
import { selectProduct } from '~/store/Market/selectors';
import { selectBuyingPower, selectMargin } from '~/store/Balances/selectors';
import { MarketEstimatesView, Props as ViewProps } from '~/modules/Trade/views/Estimates/EstimatesView';

type Props = Pick<ViewProps, 'className' | 'feeLabel'>;

export const MarketEstimatesContainer: FC<Props> = ({ className, feeLabel }) => {
  const { currency } = useSelector(selectProduct);
  const buyingPower = useSelector(selectBuyingPower);
  const imReservation = useSelector(selectEstimatedImReservation);
  const margin = useSelector(selectMargin);
  const fee = useSelector(selectEstimatedImFee);

  const imChange = useMemo(() => {
    if (typeof imReservation === 'undefined') return 0;

    return Number(imReservation) - margin;
  }, [imReservation]);

  return (
    <MarketEstimatesView
      className={className}
      ccy={currency}
      buyingPower={buyingPower}
      imChange={imChange}
      fee={fee || 0}
      feeLabel={feeLabel}
    />
  );
};
