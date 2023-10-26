import React, { FC } from 'react';

import { PromptComponent } from '~/components/Prompt/PromptComponent';
import { ModalPitchComponent } from '~/components/ModalPitch/ModalPitchComponent';

import style from './style.module.scss';

type Props = {
  visible: boolean;
  label?: string;
  address?: string;
  handleClose: () => void;
  handleClosed?: () => void;
  handleConfirmClick: () => void;
};

export const RemoveAddressPromptView: FC<Props> = ({
  visible,
  label,
  address,
  handleClose,
  handleClosed,
  handleConfirmClick
}) => (
  <PromptComponent
    visible={visible}
    handleClose={handleClose}
    handleClosed={handleClosed}
    headline="Remove the address?"
    handleConfirmClick={handleConfirmClick}
  >
    <ModalPitchComponent>
      Label: <strong>{label || ''}</strong>
    </ModalPitchComponent>

    <ModalPitchComponent className={style.removePromptAddressAddress}>{address || ''}</ModalPitchComponent>
  </PromptComponent>
);
