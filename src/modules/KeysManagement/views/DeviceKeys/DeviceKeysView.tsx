import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { DeviceKey } from '~/types/deviceKeysTypes';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { DeviceKeyComponent } from '~/modules/KeysManagement/components/DeviceKey/DeviceKeyComponent';
import { LoadingWrapperComponent } from '~/components/LoadingWrapper/LoadingWrapperComponent';
import { EmptyWrapperComponent } from '~/components/EmptyWrapper/EmptyWrapperComponent';
import { SearchIcon } from '~/assets/Icons';

import style from './style.module.scss';

export type Props = {
  className?: string;
  keys: DeviceKey<number>[];
  searchVisible: boolean;
  activeDeviceKey?: null | string;
  loading: boolean;
  empty: boolean;
  children: ReactNode;
  handleKeyClick: (value: DeviceKey<number>) => () => void;
  handleSearchClick: () => void;
};

export const DeviceKeysView: FC<Props> = ({
  className,
  keys,
  loading,
  searchVisible,
  activeDeviceKey,
  empty,
  children,
  handleKeyClick,
  handleSearchClick
}) => (
  <LoadingWrapperComponent className={style.deviceKeysEmptyWrapper} visible={loading}>
    <EmptyWrapperComponent className={style.deviceKeysEmptyWrapper} visible={empty}>
      <div className={clsx(style.deviceKeys, className)}>
        {children}
        <div className={clsx(style.deviceKeysHeader, searchVisible && style.deviceKeysHeaderHidden)}>
          <ProtectedLayoutHeadlineComponent>Device keys</ProtectedLayoutHeadlineComponent>
          <ButtonComponent className={style.deviceKeysSearchButton} onClick={handleSearchClick}>
            <SearchIcon className={style.deviceKeysSearchIcon} />
          </ButtonComponent>
        </div>
        <div className={style.deviceKeysList}>
          {keys.map((key) => (
            <DeviceKeyComponent
              key={key.key}
              label={key.label}
              deviceKey={key.key}
              active={key.key === activeDeviceKey}
              handleClick={handleKeyClick(key)}
            />
          ))}
        </div>
      </div>
    </EmptyWrapperComponent>
  </LoadingWrapperComponent>
);
