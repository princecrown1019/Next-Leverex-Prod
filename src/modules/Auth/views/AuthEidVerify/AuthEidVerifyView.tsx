import React, { memo } from 'react';

import { ImgComponent } from '~/components/Img/ImgComponent';
import { ModalComponent, Props as ModalProps } from '~/components/Modal/ModalComponent';
import { AuthEidInstructionsComponent } from '~/modules/Auth/components/AuthEidInstructions/AuthEidInstructionsComponent';

import style from './style.module.scss';

type Props = Omit<ModalProps, 'children'> & {
  handleLoginClick: () => void;
};

export const AuthEidVerifyView = memo<Props>(
  memo<Props>(({ visible, handleClose, handleClosed, handleLoginClick, handleBack }) => (
    <ModalComponent visible={visible} handleClose={handleClose} handleClosed={handleClosed} handleBack={handleBack}>
      <AuthEidInstructionsComponent title="Verify your identity" handleButtonClick={handleLoginClick}>
        <ImgComponent
          className={style.authEidVerifiedModalPicture}
          src="/static/media/auth/id-card-illustration.svg"
          alt="id-card"
        />
        <ol className={style.authEidVerifiedModalSteps}>
          <li className={style.authEidVerifiedModalStep}>
            <strong>Open</strong> the Auth eID App and <strong>go to</strong> settings.
          </li>
          <li className={style.authEidVerifiedModalStep}>
            <strong>Verify</strong> your phone number.
          </li>
          <li className={style.authEidVerifiedModalStep}>
            <strong>Verify</strong> your address.
          </li>
          <li className={style.authEidVerifiedModalStep}>
            <strong>Scan</strong> your passport and <strong>verify</strong> your identity by taking a selfie.
          </li>
          <li className={style.authEidVerifiedModalStep}>
            <strong>Follow</strong> further instructions provided by Auth eID App.
          </li>
        </ol>
      </AuthEidInstructionsComponent>
    </ModalComponent>
  ))
);
