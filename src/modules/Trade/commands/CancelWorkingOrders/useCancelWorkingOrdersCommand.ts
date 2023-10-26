import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductSide } from '~/types/productTypes';
import { selectProductType } from '~/store/Market/selectors';
import { ordersActions } from '~/store/Orders/slice';

export const useCancelWorkingOrdersCommand = () => {
  const dispatch = useDispatch();

  const productType = useSelector(selectProductType);

  return useCallback(
    (side: ProductSide, price: number) => {
      dispatch(ordersActions.cancelWorkingOrder({ productType, side, price }));
    },
    [productType]
  );
};
