import React, { FC } from 'react';

import { DeviceKey } from '~/types/deviceKeysTypes';
import { usePromptsContext } from '~/contexts/Prompt/PromptContext';
import { RemoveKeyPromptView } from '~/modules/KeysManagement/views/RemoveKeyPrompt/RemoveKeyPromptView';

type Props = {
  handleClosed?: () => void;
  deviceKey?: null | DeviceKey<number>;
};

export const RemoveKeyPromptContainer: FC<Props> = ({ deviceKey, handleClosed }) => {
  const { visible, controls } = usePromptsContext();

  return (
    <RemoveKeyPromptView
      visible={visible}
      handleClose={controls.close}
      handleClosed={handleClosed}
      handleConfirmClick={controls.confirm}
      deviceKey={deviceKey}
    />
  );
};
