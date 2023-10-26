import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { selectLoggedIn } from '~/store/Session/selectors';

export const useRegisteredCommand = () => {
  const loggedIn = useSelector(selectLoggedIn);

  const { registerVisible, registerControls } = useModalsContext();

  useEffect(() => {
    if (!loggedIn || !registerVisible) return;

    registerControls.close();
  }, [loggedIn, registerVisible]);
};
