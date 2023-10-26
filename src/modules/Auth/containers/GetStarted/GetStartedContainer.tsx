import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { selectRegisterRequestId, selectRegisterUrl } from '~/store/Session/selectors';
import { useMobileRegisterUpgradedCommand } from '~/modules/Auth/commands/MobileRegisterUpgraded/useMobileRegisterUpgradedCommand';
import { useMobileCancelAuthEidRequestCommand } from '~/modules/Auth/commands/MobileCancelAuthEidRequest/useCancelAuthEidRequestCommand';
import { GetStartedView } from '~/modules/Auth/views/GetStarted/GetStartedView';

export const GetStartedContainer = memo(() => {
  const registerUrl = useSelector(selectRegisterUrl);
  const requestId = useSelector(selectRegisterRequestId);

  const { getStartedVisible, registerControls, getStartedControls, authEidDownloadControls } = useModalsContext();

  useMobileRegisterUpgradedCommand(getStartedVisible);
  const cancelAuthEidRequest = useMobileCancelAuthEidRequestCommand(requestId);

  const handleClosed = useCallback(() => {
    cancelAuthEidRequest();
  }, []);

  return (
    <GetStartedView
      visible={getStartedVisible}
      registerUrl={registerUrl}
      handleClose={getStartedControls.close}
      handleClosed={handleClosed}
      handleAuthEidClick={authEidDownloadControls.open}
      handleScanClick={registerControls.open}
    />
  );
});
