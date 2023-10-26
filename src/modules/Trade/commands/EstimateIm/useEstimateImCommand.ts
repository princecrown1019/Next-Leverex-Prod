import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductSide } from '~/types/productTypes';
import { selectProductType } from '~/store/Market/selectors';
import { selectMaxTradeAmount } from '~/store/TradeEstimations/selectors';
import { tradeEstimationsActions } from '~/store/TradeEstimations/slice';
import { useDebounce } from '~/hooks/Debounce/useDebounce';
import { usePrevious } from '~/hooks/Previous/usePrevious';
import { selectBuyingPower } from '~/store/Balances/selectors';

export const useEstimateImCommand = (side: ProductSide, qty: number, option: boolean) => {
  const dispatch = useDispatch();

  const productType = useSelector(selectProductType);
  const maxTradeAmount = useSelector(selectMaxTradeAmount);
  const buyingPower = useSelector(selectBuyingPower);

  const maxAmount = maxTradeAmount?.[side] || 0;

  const debouncedQty = useDebounce(qty, 200);
  const prevQty = usePrevious(qty);

  useEffect(() => {
    if (!qty || qty > maxAmount || debouncedQty > maxAmount) {
      dispatch(tradeEstimationsActions.resetImEstimation());
    }
  }, [qty, debouncedQty, maxAmount]);

  useEffect(() => {
    if (prevQty || !qty || qty > maxAmount) return;

    dispatch(tradeEstimationsActions.loadImEstimation({ productType, side, qty }));
  }, [prevQty, buyingPower]);

  useEffect(() => {
    if (debouncedQty > maxAmount) return;

    if (debouncedQty) {
      dispatch(tradeEstimationsActions.loadImEstimation({ productType, side, qty: debouncedQty }));
    }
  }, [productType, side, debouncedQty, option]);
};
