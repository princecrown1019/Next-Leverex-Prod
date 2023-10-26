import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { MainPath } from '~/constants/pathsConstants';
import {
  selectLoggedInUI,
  selectRegisterRequestId,
  selectRegisterUpgradedError,
  selectRegisterUpgradedLoading,
  selectRegisterUrl,
  selectSignatureLoading
} from '~/store/Session/selectors';
import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { usePrevious } from '~/hooks/Previous/usePrevious';
import { useRegisterUpgradedCommand } from '~/modules/Auth/commands/RegisterUpgraded/useRegisterUpgradedCommand';
import { useRegisteredCommand } from '~/modules/Auth/commands/Registered/useRegisteredCommand';
import { useCancelAuthEidRequestCommand } from '~/modules/Auth/commands/CancelAuthEidRequest/useCancelAuthEidRequestCommand';
import { RegisterView } from '~/modules/Auth/views/Register/RegisterView';

export const RegisterContainer = () => {
  const { push } = useRouter();

  const registerUrl = useSelector(selectRegisterUrl);
  const loading = useSelector(selectRegisterUpgradedLoading);
  const loadingSignature = useSelector(selectSignatureLoading);
  const requestId = useSelector(selectRegisterRequestId);
  const error = useSelector(selectRegisterUpgradedError);
  const loggedInUI = useSelector(selectLoggedInUI);

  const { registerVisible, registerControls, authEidDownloadControls } = useModalsContext();

  const prevLoadingSignature = usePrevious(loadingSignature);

  useRegisteredCommand();
  const register = useRegisterUpgradedCommand(registerVisible);
  const cancelAuthEidRequest = useCancelAuthEidRequestCommand(requestId);

  useEffect(() => {
    if (loading || !error) return;

    registerControls.close();
  }, [loading]);

  useEffect(() => {
    if (loading || !loggedInUI || !registerVisible) return;

    push(MainPath.EXCHANGE);
  }, [loading]);

  return (
    <RegisterView
      loading={loading}
      loadingSignature={loadingSignature || !!prevLoadingSignature}
      visible={registerVisible}
      qrCodeValue={registerUrl}
      handleClose={registerControls.close}
      handleClosed={cancelAuthEidRequest}
      handleTryAgainClick={register}
      handleGetStartedClick={authEidDownloadControls.open}
    />
  );
};
