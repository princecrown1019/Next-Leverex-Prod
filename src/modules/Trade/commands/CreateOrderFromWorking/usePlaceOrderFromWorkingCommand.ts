import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductSide } from '~/types/productTypes';
import { AppState } from '~/store/types';
import {
  selectBuyDealersOffersWithSpreadPrice,
  selectProductType,
  selectSellDealersOffersWithSpreadPrice
} from '~/store/Market/selectors';
import {
  selectCurrentProductBuyWorkingOrdersGroupedByPrice,
  selectCurrentProductSellWorkingOrdersGroupedByPrice,
  selectWorkingOrdersLoadingIds
} from '~/store/Orders/selectors';
import { ordersActions } from '~/store/Orders/slice';

export const useCreateOrderFromWorkingCommand = (spread = 25) => {
  const loadingRef = useRef<string[]>([]);

  const dispatch = useDispatch();

  const productType = useSelector(selectProductType);
  const asks = useSelector((state: AppState) => selectSellDealersOffersWithSpreadPrice(state, spread));
  const bids = useSelector((state: AppState) => selectBuyDealersOffersWithSpreadPrice(state, spread));
  const ordersBid = useSelector(selectCurrentProductBuyWorkingOrdersGroupedByPrice);
  const ordersAsk = useSelector(selectCurrentProductSellWorkingOrdersGroupedByPrice);
  const ordersLoadingIds = useSelector(selectWorkingOrdersLoadingIds);

  const ordersBidValues = Object.values(ordersBid).flat();
  const ordersAskValues = Object.values(ordersAsk).flat();

  // Offers update very often. The "loadingRef" prevents an unnecessary request.
  useEffect(() => {
    loadingRef.current = ordersLoadingIds;
  }, [ordersLoadingIds.length]);

  const placeOrder = useCallback(
    (amount: number, side: ProductSide, userExpectedPrice: number, id: string) => {
      loadingRef.current = [id, ...loadingRef.current];
      dispatch(ordersActions.createOrder({ amount, side, productType, userExpectedPrice, reference: id }));
    },
    [productType]
  );

  useEffect(() => {
    if (!ordersAskValues.length) return;

    for (const { id, price, quantity, side } of ordersAskValues) {
      if (ordersLoadingIds.includes(id) || loadingRef.current.includes(id)) continue;

      const offers = bids.filter((offer) => offer.price >= price && offer.volume >= quantity);
      if (!offers?.length) continue;

      placeOrder(quantity, side, price, id);
    }
  }, [ordersAskValues.length, bids]);

  useEffect(() => {
    if (!ordersBidValues.length) return;

    for (const { id, price, quantity, side } of ordersBidValues) {
      if (ordersLoadingIds.includes(id) || loadingRef.current.includes(id)) continue;

      const offers = asks.filter((offer) => offer.price <= price && offer.volume >= quantity);
      if (!offers?.length) continue;

      placeOrder(quantity, side, price, id);
    }
  }, [ordersBidValues.length, asks]);
};
