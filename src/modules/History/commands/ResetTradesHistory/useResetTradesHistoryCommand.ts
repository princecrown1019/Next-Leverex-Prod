import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { tradesHistoryActions } from '~/store/TradesHistory/slice';

export const useResetTradesHistoryCommand = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(tradesHistoryActions.reset());
    };
  }, []);
};
