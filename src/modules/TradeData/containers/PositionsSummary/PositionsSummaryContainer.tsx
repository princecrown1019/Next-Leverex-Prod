import React from 'react';
import { useSelector } from 'react-redux';

import { selectProduct } from '~/store/Market/selectors';
import { selectNetExposure, selectNotionalExposure } from '~/store/Orders/selectors';
import { selectSessionProfitLoss } from '~/store/ProfitsLosses/selectors';
import { TradeDataPositionSummaryView } from '~/modules/TradeData/views/PositionSummary/PositionSummaryView';

export const TradeDataPositionsSummaryContainer = () => {
  const netExposure = useSelector(selectNetExposure);
  const sessionProfitLoss = useSelector(selectSessionProfitLoss);
  const notionalExposure = useSelector(selectNotionalExposure);
  const { currency, ticker } = useSelector(selectProduct);

  return (
    <TradeDataPositionSummaryView
      netExposure={netExposure}
      sessionProfitLoss={sessionProfitLoss}
      notionalExposure={notionalExposure}
      ccy={currency}
      ticker={ticker}
    />
  );
};
