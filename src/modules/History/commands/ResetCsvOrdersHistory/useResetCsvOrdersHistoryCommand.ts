import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { tradesHistoryActions } from '~/store/TradesHistory/slice';

export const useResetCsvOrdersHistoryCommand = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(tradesHistoryActions.resetCsv());
  }, []);
};
