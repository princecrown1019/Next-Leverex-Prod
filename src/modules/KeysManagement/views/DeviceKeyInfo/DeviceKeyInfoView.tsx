import React, { ChangeEvent, FC, MouseEvent, RefObject } from 'react';

import clsx from 'clsx';

import { DeviceKey, DeviceKeyPermission } from '~/types/deviceKeysTypes';
import { ProtectedLayoutHeadlineComponent } from '~/components/ProtectedLayoutHeadline/ProtectedLayoutHeadlineComponents';
import { SummaryRowComponent } from '~/components/SummaryRow/SummaryRowComponent';
// import { DividerComponent } from '~/components/Divider/DividerComponent';
// import { InputComponent } from '~/components/Input/InputComponent';
import { DeviceKeyComponent } from '~/modules/KeysManagement/components/DeviceKey/DeviceKeyComponent';
// import { PermissionsRowComponent } from '~/modules/DeviceKeys/components/PermissionsRow/PermissionsRowComponent';
// import { ValueDateFullUtcComponent } from '~/components/ValueDateFullUtc/ValueDateFullUtcComponent';
import { ValueDateIsoComponent } from '~/components/ValueDateIso/ValueDateIsoComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  deviceKey: null | DeviceKey<number>;
  options: string;
  empty: boolean;
  loadingRevoke: boolean;
  loginPermissions: DeviceKeyPermission;
  tradePermissions: DeviceKeyPermission;
  withdrawalPermissions: DeviceKeyPermission;
  optionsInputRef: RefObject<HTMLInputElement>;
  handleCopy: () => void;
  handleOptionsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRevokeClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleLoginPermissionChange: (value: boolean, name?: string) => void;
  handleTradePermissionChange: (value: boolean, name?: string) => void;
  handleWithdrawalPermissionChange: (value: boolean, name?: string) => void;
};

export const DeviceKeyInfoView: FC<Props> = ({
  className,
  deviceKey,
  loadingRevoke,
  empty,
  // options,
  // optionsInputRef,
  // loginPermissions,
  // tradePermissions,
  // withdrawalPermissions,
  handleRevokeClick,
  handleCopy
  // handleOptionsChange,
  // handleLoginPermissionChange,
  // handleTradePermissionChange,
  // handleWithdrawalPermissionChange
}) => {
  const classNames = [deviceKey && style.deviceKeyInfoVisible, empty && style.deviceKeyInfoEmpty];

  return (
    <div className={clsx(style.deviceKeyInfo, className, ...classNames)}>
      {deviceKey ? (
        <>
          <ProtectedLayoutHeadlineComponent>Key information</ProtectedLayoutHeadlineComponent>

          <div className={style.deviceKeyInfoSection}>
            <DeviceKeyComponent
              className={style.deviceKeyInfoKey}
              label={deviceKey.label}
              deviceKey={deviceKey.key}
              handleClick={handleCopy}
              loadingRevoke={loadingRevoke}
              handleRevokeClick={handleRevokeClick}
            />

            <div className={style.deviceKeyInfoMeta}>
              <SummaryRowComponent label="Creation date">
                <ValueDateIsoComponent>{deviceKey.created}</ValueDateIsoComponent>
              </SummaryRowComponent>
              <SummaryRowComponent label="Last time used">
                <ValueDateIsoComponent>{deviceKey.updated}</ValueDateIsoComponent>
              </SummaryRowComponent>
              <SummaryRowComponent label="Label">{deviceKey.label}</SummaryRowComponent>
            </div>
          </div>

          {/*<DividerComponent className={style.deviceKeyInfoDivider} />*/}

          {/*<div className={style.deviceKeyInfoSection}>*/}
          {/*  <ProtectedLayoutHeadlineComponent>Options</ProtectedLayoutHeadlineComponent>*/}
          {/*  <p className={style.deviceKeyInfoOptionsPitch}>*/}
          {/*    Advanced users may choose to enter modifications to their options*/}
          {/*  </p>*/}
          {/*  <InputComponent*/}
          {/*    className={style.deviceKeyInfoOptionsInput}*/}
          {/*    value={options}*/}
          {/*    label="String"*/}
          {/*    ref={optionsInputRef}*/}
          {/*    onChange={handleOptionsChange}*/}
          {/*  />*/}
          {/*</div>*/}

          {/*<DividerComponent className={style.deviceKeyInfoDivider} />*/}

          {/*<div className={style.deviceKeyInfoSection}>*/}
          {/*  <ProtectedLayoutHeadlineComponent>Key permissions</ProtectedLayoutHeadlineComponent>*/}

          {/*  <div className={style.deviceKeyInfoPermissions}>*/}
          {/*    <PermissionsRowComponent*/}
          {/*      label="Login"*/}
          {/*      handleChange={handleLoginPermissionChange}*/}
          {/*      {...loginPermissions}*/}
          {/*    />*/}
          {/*    <PermissionsRowComponent*/}
          {/*      label="Trade"*/}
          {/*      handleChange={handleTradePermissionChange}*/}
          {/*      {...tradePermissions}*/}
          {/*    />*/}
          {/*    <PermissionsRowComponent*/}
          {/*      label="Withdrawal"*/}
          {/*      handleChange={handleWithdrawalPermissionChange}*/}
          {/*      {...withdrawalPermissions}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </>
      ) : null}
    </div>
  );
};
