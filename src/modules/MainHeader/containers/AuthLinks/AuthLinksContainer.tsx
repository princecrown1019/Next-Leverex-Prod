import React, { memo, useCallback, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';

import { useRouter } from 'next/router';

import { selectLoggedInUI, selectLoginUrl } from '~/store/Session/selectors';
import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { MainHeaderAuthLinksView } from '~/modules/MainHeader/views/AuthLinks/AuthLinksView';
import { useMobileLoginUpgradedCommand } from '~/modules/MainHeader/commands/MobileLoginUpgraded/useMobileLoginUpgradedCommand';

export const MainHeaderAuthLinksContainer = memo(() => {
  const { pathname } = useRouter();
  const { getStartedControls, loginControls } = useModalsContext();

  const loggedInUI = useSelector(selectLoggedInUI);
  const loginUrl = useSelector(selectLoginUrl);

  useMobileLoginUpgradedCommand(loggedInUI);

  const handleLoginClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return;

    event.preventDefault();
    loginControls.open();
  }, []);

  return loggedInUI ? null : (
    <MainHeaderAuthLinksView
      loginUrl={loginUrl || pathname}
      registerUrl={pathname}
      handleRegisterClick={getStartedControls.open}
      handleLoginClick={handleLoginClick}
    />
  );
});
