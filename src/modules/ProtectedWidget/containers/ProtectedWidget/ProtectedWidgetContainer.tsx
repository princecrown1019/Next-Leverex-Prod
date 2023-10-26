import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { selectLoggedIn, selectLoggedInUI, selectLoginUrl } from '~/store/Session/selectors';
import { useMobileLoginUpgradedCommand } from '~/modules/ProtectedWidget/commands/MobileLoginUpgraded/useMobileLoginUpgradedCommand';
import {
  ProtectedWidgetView,
  Props as ViewProps
} from '~/modules/ProtectedWidget/views/ProtectedWidget/ProtectedWidgetView';

type Props = Pick<ViewProps, 'className'>;

export const ProtectedWidgetContainer: FC<Props> = ({ className }) => {
  const { loginControls, getStartedControls } = useModalsContext();

  const loggedIn = useSelector(selectLoggedIn);
  const loggedInUI = useSelector(selectLoggedInUI);
  const loginUrl = useSelector(selectLoginUrl);

  useMobileLoginUpgradedCommand(loggedIn);

  return loggedInUI ? null : (
    <ProtectedWidgetView
      className={className}
      loginUrl={loginUrl}
      handleLoginClick={loginControls.open}
      handleRegisterClick={getStartedControls.open}
    />
  );
};
