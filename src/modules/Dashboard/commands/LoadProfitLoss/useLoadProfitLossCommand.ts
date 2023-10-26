import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoggedIn } from '~/store/Session/selectors';
import { selectProductType } from '~/store/Market/selectors';
import { profitsLossesActions } from '~/store/ProfitsLosses/slice';

export const useLoadProfitLossCommand = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);
  const productType = useSelector(selectProductType);

  useEffect(() => {
    if (!loggedIn) return;

    dispatch(profitsLossesActions.loadDay({ productType }));
    dispatch(profitsLossesActions.loadWeek({ productType }));
    dispatch(profitsLossesActions.loadMonth({ productType }));
    dispatch(profitsLossesActions.loadYear({ productType }));
    dispatch(profitsLossesActions.loadAllTime({ productType }));
  }, [loggedIn, productType]);
};
