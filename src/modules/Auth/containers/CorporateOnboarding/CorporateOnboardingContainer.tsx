import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCorporateMerkleRoot,
  selectRegisterCorporateError,
  selectRegisterCorporateLoading,
  selectRegisterCorporateRequestId,
  selectRegisterCorporateUrl,
  selectSignatureLoading
} from '~/store/Session/selectors';
import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { useRegisteredCommand } from '~/modules/Auth/commands/Registered/useRegisteredCommand';
import { useCancelAuthEidRequestCommand } from '~/modules/Auth/commands/CancelAuthEidRequest/useCancelAuthEidRequestCommand';
import { usePrevious } from '~/hooks/Previous/usePrevious';
import { CorporateOnboardingView } from '~/modules/Auth/views/CorporateOnboarding/CorporateOnboardingView';
import { useRegisterCorporateCommand } from '~/modules/Auth/commands/RegisterCorporate/useRegisterCorporateCommand';

export const CorporateOnboardingContainer = memo(() => {
  const registerUrl = useSelector(selectRegisterCorporateUrl);
  const loading = useSelector(selectRegisterCorporateLoading);
  const loadingSignature = useSelector(selectSignatureLoading);
  const requestId = useSelector(selectRegisterCorporateRequestId);
  const error = useSelector(selectRegisterCorporateError);
  const merkleRoot = useSelector(selectCorporateMerkleRoot);

  const { corporateOnboardingVisible, corporateOnboardingControls, authEidDownloadControls } = useModalsContext();

  const prevLoadingSignature = usePrevious(loadingSignature);

  useRegisteredCommand();
  const registerCorporate = useRegisterCorporateCommand();
  const cancelAuthEidRequest = useCancelAuthEidRequestCommand(requestId);

  useEffect(() => {
    if (loading || error) return;

    corporateOnboardingControls.close();
  }, [loading]);

  const handleTryAgainClick = useCallback(() => {
    if (!merkleRoot) return;

    registerCorporate(merkleRoot);
  }, [merkleRoot]);

  return (
    <CorporateOnboardingView
      loading={loading}
      loadingSignature={loadingSignature || !!prevLoadingSignature}
      visible={corporateOnboardingVisible}
      qrCodeValue={registerUrl}
      handleClose={corporateOnboardingControls.close}
      handleClosed={cancelAuthEidRequest}
      handleTryAgainClick={handleTryAgainClick}
      handleGetStartedClick={authEidDownloadControls.open}
    />
  );
});
