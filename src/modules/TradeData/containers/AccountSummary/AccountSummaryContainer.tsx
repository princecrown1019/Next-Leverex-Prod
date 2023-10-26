import React from 'react';
import { useSelector } from 'react-redux';

import { selectProduct } from '~/store/Market/selectors';
import { selectBuyingPower, selectMargin, selectTotalBalance } from '~/store/Balances/selectors';
import { TradeDataAccountSummaryView } from '~/modules/TradeData/views/AccountSummary/AccountSummaryView';

export const TradeDataAccountSummaryContainer = () => {
  const buyingPower = useSelector(selectBuyingPower);
  const margin = useSelector(selectMargin);
  const totalBalance = useSelector(selectTotalBalance);
  const { currency } = useSelector(selectProduct);

  return (
    <TradeDataAccountSummaryView
      buyingPower={buyingPower}
      marginUsage={margin}
      totalBalance={totalBalance}
      ccy={currency}
    />
  );
};
