import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sessionActions } from '~/store/Session/slice';
import { selectSocketMainConnected } from '~/store/SocketMain/selectors';

export const useRegisterCorporateCommand = () => {
  const dispatch = useDispatch();

  const socketConnected = useSelector(selectSocketMainConnected);

  return useCallback(
    (merkleRoot: string, companyName: string) => {
      if (!socketConnected) return;

      dispatch(sessionActions.registerCorporate({ merkleRoot, companyName }));
    },
    [socketConnected]
  );
};
