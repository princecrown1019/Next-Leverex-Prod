import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChartInterval } from '~/types/chartTypes';
import { selectSocketMainConnected } from '~/store/SocketMain/selectors';
import { priceChartActions } from '~/store/PriceChart/slice';

export const useLoadChartLastTwoCandlesCommand = () => {
  const dispatch = useDispatch();

  const socketConnected = useSelector(selectSocketMainConnected);

  return useCallback(
    (interval: ChartInterval) => {
      if (!socketConnected) return;

      dispatch(priceChartActions.loadLastTwoCandles({ interval }));
    },
    [socketConnected]
  );
};
