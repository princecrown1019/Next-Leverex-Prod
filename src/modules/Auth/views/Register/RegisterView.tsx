import React, { memo } from 'react';

import {
  AuthEidQrModalComponent,
  Props as ModalProps
} from '~/modules/Auth/components/AuthEidQrModal/AuthEidQrModalComponent';

type Props = Omit<ModalProps, 'title'>;

export const RegisterView = memo<Props>(
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
      title="Register with Auth eID App"
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
