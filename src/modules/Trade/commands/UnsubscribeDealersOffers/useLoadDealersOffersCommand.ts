import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectProductType } from '~/store/Market/selectors';
import { marketActions } from '~/store/Market/slice';
import { selectSocketMainConnected } from '~/store/SocketMain/selectors';

export const useUnsubscribeDealersOffersCommand = () => {
  const dispatch = useDispatch();

  const socketConnected = useSelector(selectSocketMainConnected);
  const productType = useSelector(selectProductType);

  return useEffect(() => {
    return () => {
      if (!socketConnected) return;

      dispatch(marketActions.unsubscribeDealersOffers({ productType }));
    };
  }, []);
};
