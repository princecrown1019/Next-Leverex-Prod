import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoggedIn } from '~/store/Session/selectors';
import { feesHistoryActions } from '~/store/FeesHistory/slice';

export const useAllTimeFeesCommand = (option: boolean) => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (!loggedIn || option) return;

    dispatch(feesHistoryActions.loadAllTimeFees({}));
  }, [loggedIn]);
};
