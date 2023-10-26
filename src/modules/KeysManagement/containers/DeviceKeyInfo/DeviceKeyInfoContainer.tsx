import React, { ChangeEvent, FC, MouseEvent, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { DeviceKeyPermission } from '~/types/deviceKeysTypes';
import { selectDeviceKeyRevokeLoading, selectDeviceKeys } from '~/store/DeviceKeys/selectors';
import { useActiveDeviceKeyContext } from '~/modules/KeysManagement/contexts/ActiveDeviceKey/ActiveDeviceKeyContext';
import { useClipboard } from '~/hooks/Clipboard/useClipboard';
import { useInputFocus } from '~/hooks/InputFocus/useDebounce';
import { usePromptsContext } from '~/contexts/Prompt/PromptContext';
import { useRevokeDeviceKeyCommand } from '~/modules/KeysManagement/commands/RevokeDeviceKey/useRevokeDeviceKeyCommand';
import { RemoveKeyPromptContainer } from '~/modules/KeysManagement/containers/RemoveKeyPrompt/RemoveKeyPromptContainer';
import { DeviceKeyInfoView, Props as ViewProps } from '~/modules/KeysManagement/views/DeviceKeyInfo/DeviceKeyInfoView';

type Props = Pick<ViewProps, 'className'>;

const buildOptions = <T,>(newValue: T) => {
  const stringParams = Object.fromEntries(
    Object.entries(newValue).map(([key, value]) => [
      key,
      Object.entries(value)
        .filter(([_, optionValue]) => optionValue)
        .map(([optionKey]) => optionKey)
        .join(',')
    ])
  );

  return Object.entries(stringParams)
    .filter(([_, value]) => value)
    .map((keyAndOptions) => keyAndOptions.join(':'))
    .join('; ');
};

const parseOptions = <T, O = DeviceKeyPermission>(value?: string, restOptions?: O): T => {
  if (!value) return {} as T;

  const optionsArray = value.split(/; |;/).filter((i) => i);

  return Object.fromEntries(
    optionsArray.map((i) => [
      i.replace(/:.*/, ''),
      {
        ...restOptions,
        ...Object.fromEntries(
          i
            .replace(/.*:/, '')
            .split(',')
            .filter((t) => t)
            .map((key) => [key, true])
        )
      }
    ])
  ) as unknown as T;
};

const initialPermissions: DeviceKeyPermission = {
  allowed: false,
  confirmed: false,
  denied: false
};

const initialState = {
  login: initialPermissions,
  trade: initialPermissions,
  withdrawal: initialPermissions
};

export const DeviceKeyInfoContainer: FC<Props> = ({ className }) => {
  const { activeKey } = useActiveDeviceKeyContext();
  const { controls } = usePromptsContext();

  const { copyToClipboard } = useClipboard();
  const optionsInput = useInputFocus();

  const [options, setOptions] = useState('');
  const [state, setState] = useState(initialState);

  const deviceKeys = useSelector(selectDeviceKeys);
  const loadingRevoke = useSelector(selectDeviceKeyRevokeLoading);

  const revoke = useRevokeDeviceKeyCommand(loadingRevoke);

  const deviceKey = useMemo(() => {
    if (!activeKey) return null;

    return deviceKeys.find((key) => key.key === activeKey) || null;
  }, [deviceKeys, activeKey]);

  const handleRevokeClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (!deviceKey || loadingRevoke) return;

      controls.open(() => {
        revoke(deviceKey.key);
      });
    },
    [deviceKey, loadingRevoke]
  );

  const handleCopy = useCallback(() => {
    if (!deviceKey) return;

    copyToClipboard(deviceKey.key);
  }, [deviceKey]);

  const handleOptionsChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { value } = currentTarget;

    setOptions(value);

    if (!value) {
      setState(initialState);
      return;
    }

    const newState = parseOptions<typeof initialState>(value, initialPermissions);
    setState(newState);
  }, []);

  const handleLoginPermissionChange = useCallback((value: boolean, name?: string) => {
    if (!name) return;

    setState((prevState) => {
      const newState = { ...prevState, login: { ...prevState.login, [name]: value } };

      setOptions(buildOptions(newState));

      return newState;
    });

    optionsInput.focus();
  }, []);

  const handleTradePermissionChange = useCallback((value: boolean, name?: string) => {
    if (!name) return;

    setState((prevState) => {
      const newState = { ...prevState, trade: { ...prevState.trade, [name]: value } };

      setOptions(buildOptions(newState));

      return newState;
    });

    optionsInput.focus();
  }, []);

  const handleWithdrawalPermissionChange = useCallback((value: boolean, name?: string) => {
    if (!name) return;

    setState((prevState) => {
      const newState = { ...prevState, withdrawal: { ...prevState.withdrawal, [name]: value } };

      setOptions(buildOptions(newState));

      return newState;
    });

    optionsInput.focus();
  }, []);

  return (
    <>
      <DeviceKeyInfoView
        className={className}
        handleRevokeClick={handleRevokeClick}
        deviceKey={deviceKey}
        empty={!deviceKeys.length}
        options={options}
        loadingRevoke={loadingRevoke}
        optionsInputRef={optionsInput.ref}
        loginPermissions={state.login}
        tradePermissions={state.trade}
        withdrawalPermissions={state.withdrawal}
        handleCopy={handleCopy}
        handleOptionsChange={handleOptionsChange}
        handleLoginPermissionChange={handleLoginPermissionChange}
        handleTradePermissionChange={handleTradePermissionChange}
        handleWithdrawalPermissionChange={handleWithdrawalPermissionChange}
      />
      <RemoveKeyPromptContainer deviceKey={deviceKey} />
    </>
  );
};
