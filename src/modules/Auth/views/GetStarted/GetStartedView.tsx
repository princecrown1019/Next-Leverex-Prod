import React, { memo } from 'react';
import { isMobile } from 'react-device-detect';

import clsx from 'clsx';

import { AUTH_EID_STORE_URL, AUTH_EID_WEBSITE_URL, TESTNET_ENV } from '~/constants/configConstants';
import { ModalComponent, Props as ModalProps } from '~/components/Modal/ModalComponent';
import { ModalHeadlineComponent } from '~/components/ModalHeadline/ModalHeadlineComponent';
import { ModalPitchComponent } from '~/components/ModalPitch/ModalPitchComponent';
import { ImgComponent } from '~/components/Img/ImgComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { LinkButtonComponent } from '~/components/LinkButton/LinkButtonComponent';
import { StaticPath } from '~/constants/pathsConstants';
import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';

import style from './style.module.scss';

type Props = Omit<ModalProps, 'children'> & {
  registerUrl: null | string;
  handleScanClick: () => void;
  handleAuthEidClick: () => void;
  handleClose: () => void;
};

export const GetStartedView = memo<Props>(
  ({ visible, registerUrl, handleClose, handleClosed, handleAuthEidClick, handleScanClick }) => (
    <ModalComponent visible={visible} handleClose={handleClose} handleClosed={handleClosed}>
      <ModalHeadlineComponent>Get started with Auth eID App</ModalHeadlineComponent>
      <ModalPitchComponent>
        Leverex uses the&nbsp;
        <LinkComponent className={style.getStartedModalPitchBold} href={AUTH_EID_WEBSITE_URL} target="_blank">
          Auth eID App
        </LinkComponent>
        &nbsp;for account registration and login.
        {TESTNET_ENV && (
          <>
            <strong>Testnet</strong> environment and its participants are not subject to KYC.
          </>
        )}
      </ModalPitchComponent>

      <ImgComponent className={style.getStartedModalPicture} src="/static/media/auth/auth-eid-phone-illustration.svg" />

      <ModalPitchComponent className={clsx(style.getStartedModalPitch, style.getStartedModalAgreement)}>
        By clicking &quot;{isMobile ? 'Register' : 'Scan'}&quot; I agree to Leverex&nbsp;
        <LinkComponent
          className={style.getStartedModalAgreementLink}
          href={StaticPath.PARTICIPANT_AGREEMENT}
          target="_blank"
        >
          participant agreement
        </LinkComponent>
        &nbsp;and&nbsp;
        <LinkComponent className={style.getStartedModalAgreementLink} href={StaticPath.PRIVACY_POLICY} target="_blank">
          privacy policy
        </LinkComponent>
        .
      </ModalPitchComponent>

      {isMobile ? (
        <LinkButtonComponent className={style.getStartedModalButton} href={registerUrl} target="_blank">
          Register
        </LinkButtonComponent>
      ) : (
        <ActionButtonComponent className={style.getStartedModalButton} handleClick={handleScanClick}>
          Scan
        </ActionButtonComponent>
      )}

      {isMobile ? (
        <LinkComponent className={style.getStartedModalLink} href={AUTH_EID_STORE_URL} target="_blank">
          I don’t have Auth eID App
        </LinkComponent>
      ) : (
        <LinkComponent className={style.getStartedModalLink} onClick={handleAuthEidClick}>
          I don’t have Auth eID App
        </LinkComponent>
      )}
    </ModalComponent>
  )
);
