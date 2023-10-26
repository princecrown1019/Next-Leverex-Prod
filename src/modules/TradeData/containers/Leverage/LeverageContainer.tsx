import React from 'react';
import { useSelector } from 'react-redux';

import { selectLeverage } from '~/store/Orders/selectors';
import { TradeDataLeverageView } from '~/modules/TradeData/views/Leverage/LeverageView';

export const TradeDataLeverageContainer = () => {
  const leverage = useSelector(selectLeverage);

  return <TradeDataLeverageView leverage={leverage} />;
};
