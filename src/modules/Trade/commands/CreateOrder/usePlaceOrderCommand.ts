import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductSide } from '~/types/productTypes';
import { selectProductType } from '~/store/Market/selectors';
import { selectCreateOrderLoading } from '~/store/Orders/selectors';
import { ordersActions } from '~/store/Orders/slice';

export const useCreateOrderCommand = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectCreateOrderLoading);
  const productType = useSelector(selectProductType);

  return useCallback(
    (side: ProductSide, amount: number) => {
      if (loading) return;

      dispatch(ordersActions.createOrder({ amount, side, productType }));
    },
    [productType, loading]
  );
};
