import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { MainPath } from '~/constants/pathsConstants';
import {
  selectLoggedInUI,
  selectLoginRequestId,
  selectLoginUpgradedError,
  selectLoginUpgradedLoading,
  selectLoginUrl,
  selectSignatureLoading
} from '~/store/Session/selectors';
import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { usePrevious } from '~/hooks/Previous/usePrevious';
import { useLoginUpgradedCommand } from '~/modules/Auth/commands/LoginUpgraded/useLoginUpgradedCommand';
import { useLoggedInCommand } from '~/modules/Auth/commands/LoggedIn/useLoggedInCommand';
import { useCancelAuthEidRequestCommand } from '~/modules/Auth/commands/CancelAuthEidRequest/useCancelAuthEidRequestCommand';
import { LoginView } from '~/modules/Auth/views/Login/LoginView';

export const LoginContainer = () => {
  const { push } = useRouter();

  const loginUrl = useSelector(selectLoginUrl);
  const loading = useSelector(selectLoginUpgradedLoading);
  const loadingSignature = useSelector(selectSignatureLoading);
  const requestId = useSelector(selectLoginRequestId);
  const error = useSelector(selectLoginUpgradedError);
  const loggedInUI = useSelector(selectLoggedInUI);

  const { loginVisible, loginControls, authEidDownloadControls } = useModalsContext();

  const prevLoadingSignature = usePrevious(loadingSignature);

  useLoggedInCommand();
  const login = useLoginUpgradedCommand(loginVisible);
  const cancelAuthEidRequest = useCancelAuthEidRequestCommand(requestId);

  useEffect(() => {
    if (loading || !error) return;

    loginControls.close();
  }, [loading]);

  useEffect(() => {
    if (loading || !loggedInUI || !loginVisible) return;

    push(MainPath.EXCHANGE);
  }, [loading]);

  return (
    <LoginView
      loading={loading}
      visible={loginVisible}
      qrCodeValue={loginUrl}
      handleClose={loginControls.close}
      handleClosed={cancelAuthEidRequest}
      loadingSignature={loadingSignature || !!prevLoadingSignature}
      handleGetStartedClick={authEidDownloadControls.open}
      handleTryAgainClick={login}
    />
  );
};
