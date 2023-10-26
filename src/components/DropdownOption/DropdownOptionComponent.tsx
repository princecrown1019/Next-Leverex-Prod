import React, { ReactNode, MouseEvent, FC } from 'react';

import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

export type Props = {
  disabled?: boolean;
  children: ReactNode;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const DropdownOptionComponent: FC<Props> = ({ disabled, children, handleClick }) => (
  <li>
    <ButtonComponent className={style.dropdownButton} disabled={disabled} onClick={handleClick}>
      {children}
    </ButtonComponent>
  </li>
);
