import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectProductType } from '~/store/Market/selectors';
import { ordersActions } from '~/store/Orders/slice';

export const useCancelWorkingOrderCommand = () => {
  const dispatch = useDispatch();

  const productType = useSelector(selectProductType);

  return useCallback(
    (id: string) => {
      dispatch(ordersActions.cancelWorkingOrder({ productType, id }));
    },
    [productType]
  );
};
