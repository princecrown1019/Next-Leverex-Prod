import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectLoggedInUI } from '~/store/Session/selectors';
import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { useLogoutCommand } from '~/modules/MainHeader/commands/Logout/useLogoutCommand';
import { MainHeaderEndView } from '~/modules/MainHeader/views/HeaderEnd/HeaderMainEndView';

export const MainHeaderEndContainer = memo(() => {
  const loggedInUI = useSelector(selectLoggedInUI);

  const { getStartedControls, loginControls } = useModalsContext();

  const logout = useLogoutCommand();

  return (
    <MainHeaderEndView
      loggedInUI={loggedInUI}
      handleLoginClick={loginControls.open}
      handleRegisterClick={getStartedControls.open}
      handleLogoutClick={logout}
    />
  );
});
