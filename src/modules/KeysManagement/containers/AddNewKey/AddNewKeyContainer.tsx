import React, { FC, FormEvent, ChangeEvent, KeyboardEvent, useCallback, useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { AccountPath } from '~/constants/pathsConstants';
import { selectDeviceKeys } from '~/store/DeviceKeys/selectors';
import { useLoadDeviceKeysCommand } from '~/modules/KeysManagement/commands/LoadDeviceKeys/useLoadDeviceKeysCommand';
import { AddNewKeyView, Props as ViewProps } from '~/modules/KeysManagement/views/AddNewKey/AddNewKeyView';

type Props = Pick<ViewProps, 'className'>;

const initialState = {
  label: '',
  value: ''
};

export const AddNewKeyContainer: FC<Props> = ({ className }) => {
  const { push } = useRouter();

  const deviceKeys = useSelector(selectDeviceKeys);
  const loading = false;
  const error = null;

  const [state, setState] = useState(initialState);

  useLoadDeviceKeysCommand(!!deviceKeys.length);

  useEffect(() => {
    if (loading || error || !state.value) return;

    push(AccountPath.KEY_MANAGEMENT);
  }, [loading]);

  const disabled = useMemo(() => {
    return !state.label || !state.value;
  }, [state.label, state.value]);

  const handleLabelChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, label: currentTarget.value }));
  }, []);

  const handleValueChange = useCallback(({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({ ...prevState, value: currentTarget.value.trim() }));
  }, []);

  const handleValuePaste = useCallback((address: string) => {
    setState((prevState) => ({ ...prevState, value: address.trim() }));
  }, []);

  const handleSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      if (loading || disabled) return;
    },
    [loading, disabled, state.value, state.label]
  );

  const handleValueKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.code !== 'Enter' || event.shiftKey) return;
      event.preventDefault();

      handleSubmit();
    },
    [handleSubmit]
  );

  return (
    <AddNewKeyView
      className={className}
      value={state.value}
      label={state.label}
      disabled={disabled}
      loading={loading}
      handleLabelChange={handleLabelChange}
      handleValueChange={handleValueChange}
      handleValueKeyDown={handleValueKeyDown}
      handleValuePaste={handleValuePaste}
      handleSubmit={handleSubmit}
    />
  );
};
