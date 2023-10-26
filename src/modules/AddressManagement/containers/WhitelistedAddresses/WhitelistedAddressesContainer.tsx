import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  selectRemoveAddressLoading,
  selectWhitelistAddressLoading,
  selectWhitelistedAddresses
} from '~/store/Addresses/selectors';
import { useLoadWhitelistedAddresses } from '~/modules/AddressManagement/commands/LoadWhitelistedAddresses/useLoadWhitelistedAddresses';
import { useRemoveWhitelistedAddress } from '~/modules/AddressManagement/commands/RemoveWhitelistedAddress/useRemoveWhitelistedAddress';
import { usePromptsContext } from '~/contexts/Prompt/PromptContext';
import { RemoveAddressPromptContainer } from '~/modules/AddressManagement/containers/RemoveAddressPrompt/RemoveAddressPromptContainer';
import {
  WhitelistedAddressesView,
  Props as ViewProps
} from '~/modules/AddressManagement/views/WhitelistedAddresses/WhitelistedAddressesView';

type Props = Pick<ViewProps, 'className'>;

export const WhitelistedAddressesContainer: FC<Props> = ({ className }) => {
  const loading = useSelector(selectWhitelistAddressLoading);
  const loadingRemove = useSelector(selectRemoveAddressLoading);
  const addresses = useSelector(selectWhitelistedAddresses);

  const { controls } = usePromptsContext();

  useLoadWhitelistedAddresses(!!addresses.length);
  const { remove, removingAddress, setRemovingAddress } = useRemoveWhitelistedAddress();

  const handleRemoveClick = useCallback(
    (address: string, description?: string) => () => {
      if (loading || removingAddress?.address === address) return;

      setRemovingAddress({ address, description });

      controls.open(() => {
        remove(address);
      });
    },
    [loading, removingAddress]
  );

  const handleConfirmationClosed = useCallback(() => {
    setRemovingAddress(null);
  }, []);

  return (
    <>
      <WhitelistedAddressesView
        className={className}
        addresses={addresses}
        loading={loadingRemove}
        removingAddress={removingAddress?.address}
        handleRemoveClick={handleRemoveClick}
      />
      <RemoveAddressPromptContainer removingAddress={removingAddress} handleClosed={handleConfirmationClosed} />
    </>
  );
};
