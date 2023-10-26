import React, { FC } from 'react';

import { Address } from '~/types/addressTypes';
import { usePromptsContext } from '~/contexts/Prompt/PromptContext';
import { RemoveAddressPromptView } from '~/modules/AddressManagement/views/RemoveAddressPrompt/RemoveAddressPromptView';

type Props = {
  handleClosed?: () => void;
  removingAddress?: null | Omit<Address, 'timestamp'>;
};

export const RemoveAddressPromptContainer: FC<Props> = ({ removingAddress, handleClosed }) => {
  const { visible, controls } = usePromptsContext();

  return (
    <RemoveAddressPromptView
      visible={visible}
      handleClose={controls.close}
      handleClosed={handleClosed}
      handleConfirmClick={controls.confirm}
      label={removingAddress?.description}
      address={removingAddress?.address}
    />
  );
};
