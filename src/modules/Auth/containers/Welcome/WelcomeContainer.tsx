import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { selectBalancesLoading, selectTotalBalance } from '~/store/Balances/selectors';
import { useRequestNotificationsPermissionCommand } from '~/modules/Trade/commands/RequestNotificationsPermission/useRequestNotificationsPermissionCommand';
import { WelcomeView } from '~/modules/Auth/views/Welcome/WelcomeView';

const registerModalRegExp = new RegExp(/^register/i);
const welcomeModalRegExp = new RegExp(/^welcome/i);

export const WelcomeContainer = () => {
  const totalBalance = useSelector(selectTotalBalance);
  const loadingBalance = useSelector(selectBalancesLoading);

  const { welcomeVisible, welcomeControls, prevModalVisible } = useModalsContext();

  const notAfterAuth = !prevModalVisible || !registerModalRegExp.test(prevModalVisible);

  useRequestNotificationsPermissionCommand(!welcomeModalRegExp.test(prevModalVisible!));

  useEffect(() => {
    if (loadingBalance || totalBalance || notAfterAuth) return;

    const timeout = setTimeout(welcomeControls.open, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [prevModalVisible, loadingBalance]);

  return <WelcomeView visible={welcomeVisible} handleClose={welcomeControls.close} />;
};
