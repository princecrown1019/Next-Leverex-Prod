import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductSide } from '~/types/productTypes';
import { selectProductType } from '~/store/Market/selectors';
import { selectMaxTradeAmount } from '~/store/TradeEstimations/selectors';
import { tradeEstimationsActions } from '~/store/TradeEstimations/slice';
import { selectLoggedIn } from '~/store/Session/selectors';

export const useMaxTradeAmountCommand = (option: boolean) => {
  const dispatch = useDispatch();

  const loggedId = useSelector(selectLoggedIn);
  const productType = useSelector(selectProductType);
  const maxTradeAmount = useSelector(selectMaxTradeAmount);

  useEffect(() => {
    if (!option || !loggedId || (maxTradeAmount?.[ProductSide.BUY] && maxTradeAmount?.[ProductSide.SELL])) return;

    dispatch(tradeEstimationsActions.loadMaxTradeAmount({ productType, side: ProductSide.SELL }));
    dispatch(tradeEstimationsActions.loadMaxTradeAmount({ productType, side: ProductSide.BUY }));
  }, [option]);
};
