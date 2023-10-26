import React, { memo } from 'react';

import {
  AuthEidQrModalComponent,
  Props as ModalProps
} from '~/modules/Auth/components/AuthEidQrModal/AuthEidQrModalComponent';

type Props = Omit<ModalProps, 'title'>;

export const LoginView = memo<Props>(
  ({
    visible,
    loading,
    qrCodeValue,
    loadingSignature,
    handleClose,
    handleClosed,
    handleGetStartedClick,
    handleTryAgainClick
  }) => (
    <AuthEidQrModalComponent
      title="Login with Auth eID App"
      loading={loading}
      handleTryAgainClick={handleTryAgainClick}
      loadingSignature={loadingSignature}
      visible={visible}
      qrCodeValue={qrCodeValue}
      handleClose={handleClose}
      handleClosed={handleClosed}
      handleGetStartedClick={handleGetStartedClick}
    />
  )
);
