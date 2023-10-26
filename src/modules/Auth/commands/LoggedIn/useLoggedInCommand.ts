import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { selectLoggedIn } from '~/store/Session/selectors';

export const useLoggedInCommand = () => {
  const loggedIn = useSelector(selectLoggedIn);

  const { loginVisible, loginControls } = useModalsContext();

  useEffect(() => {
    if (!loggedIn || !loginVisible) return;

    loginControls.close();
  }, [loggedIn, loginVisible]);
};
