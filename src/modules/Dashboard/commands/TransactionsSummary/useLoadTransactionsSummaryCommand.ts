import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectProductType } from 'store/Market/selectors';
import { loadAllTimeFees } from 'store/FeesHistory/actions';

export const useLoadTransactionsSummaryCommand = () => {
  const dispatch = useDispatch();
  const productType = useSelector(selectProductType);

  useEffect(() => {
    dispatch(loadAllTimeFees({ productType }));
  }, []);

  return useCallback(() => {
    dispatch(loadAllTimeFees({ productType }));
  }, []);
};
