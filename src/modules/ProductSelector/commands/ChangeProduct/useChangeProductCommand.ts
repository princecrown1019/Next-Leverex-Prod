import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ProductType } from '~/types/productTypes';
import { marketActions } from '~/store/Market/slice';

export const useChangeProductCommand = () => {
  const dispatch = useDispatch();

  return useCallback((productType: ProductType) => {
    dispatch(marketActions.changeProduct({ productType }));
  }, []);
};
