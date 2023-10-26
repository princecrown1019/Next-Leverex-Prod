import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoggedIn } from '~/store/Session/selectors';
import { tradesHistoryActions } from '~/store/TradesHistory/slice';
import { selectProductType } from '~/store/Market/selectors';

export const useLoadTradeDaysHistoryCommand = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);
  const productType = useSelector(selectProductType);

  useEffect(() => {
    if (!loggedIn) return;

    dispatch(tradesHistoryActions.loadDaysHistory({ offset: 0 }));
  }, [loggedIn, productType]);

  return useCallback(() => {
    if (!loggedIn) return;

    dispatch(tradesHistoryActions.loadDaysHistory({}));
  }, []);
};
