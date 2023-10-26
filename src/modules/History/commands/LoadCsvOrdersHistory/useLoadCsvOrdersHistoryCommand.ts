import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { tradesHistoryActions } from '~/store/TradesHistory/slice';

export const useLoadCsvOrdersHistoryCommand = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(tradesHistoryActions.loadCsvOrdersHistory({ offset: 0 }));
  }, []);
};
