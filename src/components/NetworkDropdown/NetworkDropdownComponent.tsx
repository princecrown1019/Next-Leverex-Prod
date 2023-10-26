import React, { FC, useCallback, useMemo } from 'react';

import { Network } from '~/types/networkTypes';
import { DropdownComponent, Props as DropdownProps } from '~/components/Dropdown/DropdownComponent';
import { LiquidNetworkIcon, LockIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = Omit<
  DropdownProps<Network>,
  'renderSelected' | 'renderOption' | 'optionKey' | 'optionDisabled' | 'options'
>;

const options = Object.values(Network);

export const NetworkDropdownComponent: FC<Props> = (props) => {
  const endAdornment = useMemo(() => <LockIcon />, []);

  const renderOption = useCallback((value: null | Network) => {
    if (!value) return null;

    return (
      <div className={style.networkDropdownOption}>
        <LiquidNetworkIcon className={style.networkDropdownIconSelected} />

        <span className={style.networkDropdownOptionName}>{value}</span>
      </div>
    );
  }, []);

  return (
    <DropdownComponent
      {...props}
      label="Network"
      options={options}
      disabled
      renderSelected={renderOption}
      endAdornment={endAdornment}
    />
  );
};
