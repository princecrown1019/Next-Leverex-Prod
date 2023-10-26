import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectSocketMainConnected } from '~/store/SocketMain/selectors';
import { selectProductType } from '~/store/Market/selectors';
import { statsActions } from '~/store/Stats/slice';

export const useTradingStatsCommand = () => {
  const dispatch = useDispatch();

  const socketConnected = useSelector(selectSocketMainConnected);
  const productType = useSelector(selectProductType);

  useEffect(() => {
    if (!socketConnected) return;

    dispatch(statsActions.loadTradingStats({ productType }));
  }, [socketConnected, productType]);
};
