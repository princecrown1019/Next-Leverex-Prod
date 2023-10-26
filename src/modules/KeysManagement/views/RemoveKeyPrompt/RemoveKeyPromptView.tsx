import React, { FC } from 'react';

import { DeviceKey } from '~/types/deviceKeysTypes';
import { PromptComponent } from '~/components/Prompt/PromptComponent';
import { ModalPitchComponent } from '~/components/ModalPitch/ModalPitchComponent';

import style from './style.module.scss';

type Props = {
  visible: boolean;
  deviceKey?: null | DeviceKey<number>;
  handleClose: () => void;
  handleClosed?: () => void;
  handleConfirmClick: () => void;
};

export const RemoveKeyPromptView: FC<Props> = ({
  visible,
  deviceKey,
  handleClose,
  handleClosed,
  handleConfirmClick
}) => (
  <PromptComponent
    visible={visible}
    handleClose={handleClose}
    handleClosed={handleClosed}
    headline="Remove device key?"
    handleConfirmClick={handleConfirmClick}
  >
    <ModalPitchComponent>
      <strong>{deviceKey?.label || ''}</strong>
    </ModalPitchComponent>

    <ModalPitchComponent className={style.removePromptKey}>{deviceKey?.key || ''}</ModalPitchComponent>
  </PromptComponent>
);
