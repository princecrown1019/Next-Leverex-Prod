import React, { ChangeEvent, FC, FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { DeviceKey } from '~/types/deviceKeysTypes';
import { selectDeviceKeys, selectDeviceKeysLoading } from '~/store/DeviceKeys/selectors';
import { useActiveDeviceKeyContext } from '~/modules/KeysManagement/contexts/ActiveDeviceKey/ActiveDeviceKeyContext';
import { useLoadDeviceKeysCommand } from '~/modules/KeysManagement/commands/LoadDeviceKeys/useLoadDeviceKeysCommand';
import { DeviceKeysKeysSearchBar } from '~/modules/KeysManagement/components/SearchBar/SearchBarComponent';
import { DeviceKeysView, Props as ViewProps } from '~/modules/KeysManagement/views/DeviceKeys/DeviceKeysView';

type Props = Pick<ViewProps, 'className'>;

export const DeviceKeysContainer: FC<Props> = ({ className }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { activeKey, controls } = useActiveDeviceKeyContext();

  const deviceKeys = useSelector(selectDeviceKeys);
  const loading = useSelector(selectDeviceKeysLoading);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useLoadDeviceKeysCommand(!!deviceKeys.length);

  const filteredDeviceKeys = useMemo(() => {
    return deviceKeys.filter((key) => new RegExp(searchValue, 'gi').test(`${key.key}`));
  }, [searchValue, deviceKeys]);

  const handleSearchClick = useCallback(() => {
    setSearchVisible((prevVisible) => !prevVisible);
    searchInputRef.current?.focus();
  }, []);

  const handleSearchClose = useCallback(() => {
    setSearchVisible(false);

    setTimeout(() => {
      setSearchValue('');
    }, 300);
  }, []);

  const handleSearchChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(currentTarget.value);
  }, []);

  const handleKeyClick = useCallback(
    (key: DeviceKey<number>) => () => {
      controls.set(key.key);
    },
    []
  );

  const handleSearchBarSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (filteredDeviceKeys.length !== 1) return;

      controls.set(filteredDeviceKeys[0].key);
    },
    [filteredDeviceKeys.length]
  );

  return (
    <DeviceKeysView
      className={className}
      loading={loading}
      activeDeviceKey={activeKey}
      empty={!deviceKeys.length}
      keys={filteredDeviceKeys}
      handleSearchClick={handleSearchClick}
      searchVisible={searchVisible}
      handleKeyClick={handleKeyClick}
    >
      <DeviceKeysKeysSearchBar
        reference={searchInputRef}
        value={searchValue}
        visible={searchVisible}
        handleClose={handleSearchClose}
        handleChange={handleSearchChange}
        handleSubmit={handleSearchBarSubmit}
      />
    </DeviceKeysView>
  );
};
