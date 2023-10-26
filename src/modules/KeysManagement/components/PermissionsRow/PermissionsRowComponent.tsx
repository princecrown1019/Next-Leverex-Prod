import React, { FC } from 'react';

import { CheckboxWithLabelComponent } from '~/components/CheckboxWithLabel/CheckboxWithLabelComponent';

import style from './style.module.scss';

export type Props = {
  label: string;
  allowed: boolean;
  confirmed: boolean;
  denied: boolean;
  handleChange: (value: boolean, name?: string) => void;
};

export const PermissionsRowComponent: FC<Props> = ({ label, allowed, confirmed, denied, handleChange }) => (
  <div className={style.deviceKeyPermissionsRow}>
    <span className={style.deviceKeyPermissionsRowLabel}>{label}</span>

    <div className={style.deviceKeyPermissionsRowCheckboxes}>
      <CheckboxWithLabelComponent
        className={style.deviceKeyPermissionsRowPermission}
        value={allowed}
        name="allowed"
        handleChange={handleChange}
      >
        Allowed
      </CheckboxWithLabelComponent>

      <CheckboxWithLabelComponent
        className={style.deviceKeyPermissionsRowPermission}
        value={confirmed}
        name="confirmed"
        handleChange={handleChange}
      >
        Confirmed
      </CheckboxWithLabelComponent>

      <CheckboxWithLabelComponent
        className={style.deviceKeyPermissionsRowPermission}
        value={denied}
        name="denied"
        handleChange={handleChange}
      >
        Denied
      </CheckboxWithLabelComponent>
    </div>
  </div>
);
