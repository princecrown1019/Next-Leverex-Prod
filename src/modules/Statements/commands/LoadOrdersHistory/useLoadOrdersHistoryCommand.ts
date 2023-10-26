import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { tradesHistoryActions } from '~/store/TradesHistory/slice';

export const useLoadOrdersHistoryCommand = () => {
  const dispatch = useDispatch();

  return useCallback((startTime?: number, endTime?: number) => {
    dispatch(tradesHistoryActions.loadCsvOrdersHistory({ offset: 0, startTime, endTime }));
  }, []);
};
