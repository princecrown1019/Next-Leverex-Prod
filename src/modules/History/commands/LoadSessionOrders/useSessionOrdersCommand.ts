import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectSocketMainConnected } from '~/store/SocketMain/selectors';
import { selectProductType } from '~/store/Market/selectors';
import { ordersActions } from '~/store/Orders/slice';

export const useLoadSessionOrdersCommand = (loggedIn: null | boolean, option: boolean) => {
  const dispatch = useDispatch();

  const socketConnected = useSelector(selectSocketMainConnected);
  const productType = useSelector(selectProductType);

  useEffect(() => {
    if (!socketConnected || !loggedIn || option) return;

    dispatch(ordersActions.loadSessionOrders({ productType }));
  }, [socketConnected, productType, loggedIn]);
};
