import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductSide } from '~/types/productTypes';
import { selectProductType } from '~/store/Market/selectors';
import { selectMaxTradeAmountLastUpdatedAt, selectMaxTradeAmountLoading } from '~/store/TradeEstimations/selectors';
import { tradeEstimationsActions } from '~/store/TradeEstimations/slice';

const MAX_AMOUNT_LIFETIME = 30_000; // 30 seconds

export const useMaxTradeAmountCommand = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectMaxTradeAmountLoading);
  const productType = useSelector(selectProductType);
  const maxAmountUpdatedAt = useSelector(selectMaxTradeAmountLastUpdatedAt);

  return useCallback(
    (side?: ProductSide) => {
      if (loading || Date.now() - maxAmountUpdatedAt < MAX_AMOUNT_LIFETIME) return;

      if (side) {
        dispatch(tradeEstimationsActions.loadMaxTradeAmount({ productType, side }));
      } else {
        dispatch(tradeEstimationsActions.loadMaxTradeAmount({ productType, side: ProductSide.SELL }));
        dispatch(tradeEstimationsActions.loadMaxTradeAmount({ productType, side: ProductSide.BUY }));
      }
    },
    [productType, loading, maxAmountUpdatedAt]
  );
};
