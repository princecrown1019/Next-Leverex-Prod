import React, { memo } from 'react';

import {
  AuthEidQrModalComponent,
  Props as ModalProps
} from '~/modules/Auth/components/AuthEidQrModal/AuthEidQrModalComponent';

type Props = Omit<ModalProps, 'title'>;

export const CorporateOnboardingView = memo<Props>(
  ({
    visible,
    loading,
    loadingSignature,
    qrCodeValue,
    handleClose,
    handleClosed,
    handleTryAgainClick,
    handleGetStartedClick
  }) => (
    <AuthEidQrModalComponent
      title="Submit corporate application"
      loading={loading}
      loadingSignature={loadingSignature}
      handleTryAgainClick={handleTryAgainClick}
      visible={visible}
      qrCodeValue={qrCodeValue}
      handleClose={handleClose}
      handleClosed={handleClosed}
      handleGetStartedClick={handleGetStartedClick}
    />
  )
);
