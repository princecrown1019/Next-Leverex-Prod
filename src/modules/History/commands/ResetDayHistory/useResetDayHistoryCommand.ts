import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { tradesHistoryActions } from '~/store/TradesHistory/slice';

export const useResetDayHistoryCommand = () => {
  const dispatch = useDispatch();

  return useCallback((startTime: number, endTime: number) => {
    dispatch(tradesHistoryActions.resetDay({ endTime, startTime }));
  }, []);
};
