import React, { memo } from 'react';

import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { AuthEidVerifyView } from '~/modules/Auth/views/AuthEidVerify/AuthEidVerifyView';

export const AuthEidVerifyContainer = memo(() => {
  const { authEidVerifyVisible, authEidVerifyControls, loginControls, prevModalControls } = useModalsContext();

  return (
    <AuthEidVerifyView
      visible={authEidVerifyVisible}
      handleClose={authEidVerifyControls.close}
      handleLoginClick={loginControls.open}
      handleBack={prevModalControls?.open}
    />
  );
});
