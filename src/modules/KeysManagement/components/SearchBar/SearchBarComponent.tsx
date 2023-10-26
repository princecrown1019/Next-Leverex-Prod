import React, { ChangeEvent, FC, FormEvent, RefObject, useMemo } from 'react';

import clsx from 'clsx';

import { InputComponent } from '~/components/Input/InputComponent';
import { BadgeButtonComponent } from '~/components/BadgeButton/BadgeButtonComponent';

import style from './style.module.scss';

export type Props = {
  value: string;
  visible: boolean;
  reference: RefObject<HTMLInputElement>;
  handleClose: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const DeviceKeysKeysSearchBar: FC<Props> = ({
  value,
  visible,
  reference,
  handleChange,
  handleClose,
  handleSubmit
}) => {
  const endAdornment = useMemo(
    () => (
      <BadgeButtonComponent className={style.deviceKeysSearchBarCloseButton} handleClick={handleClose}>
        Close
      </BadgeButtonComponent>
    ),
    []
  );

  return (
    <form
      className={clsx(style.deviceKeysSearchBar, visible && style.deviceKeysSearchBarVisible)}
      onSubmit={handleSubmit}
    >
      <InputComponent
        value={value}
        autoFocus={visible}
        label="Search your key"
        ref={reference}
        endAdornment={endAdornment}
        onChange={handleChange}
      />
    </form>
  );
};
