import React, { memo } from 'react';
import { isMobile } from 'react-device-detect';

import { ModalHeadlineComponent } from '~/components/ModalHeadline/ModalHeadlineComponent';
import { ModalPitchComponent } from '~/components/ModalPitch/ModalPitchComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { LinkButtonComponent } from '~/components/LinkButton/LinkButtonComponent';
import { ModalComponent, Props as ModalProps } from '~/components/Modal/ModalComponent';
import { AccountPath, MainPath } from '~/constants/pathsConstants';

import style from './style.module.scss';

type Props = Omit<ModalProps, 'children'>;

export const WelcomeView = memo<Props>(({ visible, handleClose, handleClosed }) => {
  const desktopDepositLink = isMobile ? null : AccountPath.DEPOSIT;

  return (
    <ModalComponent visible={visible} handleClose={handleClose} handleClosed={handleClosed}>
      <ModalHeadlineComponent>Welcome to Leverex!</ModalHeadlineComponent>
      <ModalPitchComponent className={style.welcomeModalPitch}>
        To start trading you need to top-up your account first
      </ModalPitchComponent>

      <ol className={style.welcomeModalSteps}>
        <li className={style.welcomeModalStep}>
          <strong>Tap</strong> the Deposit button
        </li>
        <li className={style.welcomeModalStep}>
          <strong>Follow</strong> the instructions provided
        </li>
        <li className={style.welcomeModalStep}>
          <strong>Instant</strong> top-up, <strong>easy</strong> as that!
        </li>
      </ol>

      <LinkButtonComponent className={style.welcomeModalButton} href={desktopDepositLink} onClick={handleClose}>
        Deposit
      </LinkButtonComponent>

      <ModalPitchComponent className={style.welcomeModalBottomPitch}>
        Looking for more information?&nbsp;
        <LinkComponent href={MainPath.FAQ}>Check our FAQ</LinkComponent>.
      </ModalPitchComponent>
    </ModalComponent>
  );
});
