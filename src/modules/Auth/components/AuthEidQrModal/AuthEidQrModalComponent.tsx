import React, { memo } from 'react';

import { ModalComponent, Props as ModalProps } from '~/components/Modal/ModalComponent';
import { ModalHeadlineComponent } from '~/components/ModalHeadline/ModalHeadlineComponent';
import { ModalPitchComponent } from '~/components/ModalPitch/ModalPitchComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { QrCodeComponent } from '~/components/QrCode/QrCodeComponent';
import { AuthEidCountDown } from '~/modules/Auth/components/AuthEidCountDown/AuthEidCountDownComponent';

import style from './style.module.scss';

export type Props = Omit<ModalProps, 'children'> & {
  title: string;
  loading: boolean;
  loadingSignature: boolean;
  qrCodeValue: null | string;
  handleTryAgainClick: () => void;
  handleGetStartedClick: () => void;
};

export const AuthEidQrModalComponent = memo<Props>(
  ({
    title,
    visible,
    qrCodeValue,
    loading,
    loadingSignature,
    handleClose,
    handleClosed,
    handleTryAgainClick,
    handleGetStartedClick
  }) => (
    <ModalComponent visible={visible} handleClose={handleClose} handleClosed={handleClosed}>
      <ModalHeadlineComponent>{title}</ModalHeadlineComponent>
      <ModalPitchComponent>
        Don’t have the Auth eID App?&nbsp;
        <LinkComponent onClick={handleGetStartedClick}>Get started here</LinkComponent>.
      </ModalPitchComponent>

      {loadingSignature ? (
        <AuthEidCountDown handleTryAgainClick={handleTryAgainClick} />
      ) : (
        <QrCodeComponent className={style.authEidModalQr} loading={loading} value={qrCodeValue} size={200} />
      )}

      <ol className={style.authEidModalSteps}>
        <li className={style.authEidModalStep}>
          <strong>Open</strong> the Auth eID App on your mobile phone.
        </li>
        <li className={style.authEidModalStep}>
          <strong>Tap</strong> the QR symbol on the Auth eID App.
        </li>
        <li className={style.authEidModalStep}>
          <strong>Point</strong> the camera at the QR code in this field.
        </li>
      </ol>
    </ModalComponent>
  )
);
