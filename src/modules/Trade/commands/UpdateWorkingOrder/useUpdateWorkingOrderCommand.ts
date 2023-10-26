import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductSide } from '~/types/productTypes';
import { selectProductType } from '~/store/Market/selectors';
import { ordersActions } from '~/store/Orders/slice';

export const useUpdateWorkingOrderCommand = () => {
  const dispatch = useDispatch();

  const productType = useSelector(selectProductType);

  return useCallback(
    (id: string, side: ProductSide, quantity: number, price: number) => {
      dispatch(ordersActions.updateWorkingOrder({ id, quantity, price, side, productType }));
    },
    [productType]
  );
};
