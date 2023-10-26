import React, { memo } from 'react';

import clsx from 'clsx';

import { BadgeButtonComponent } from '~/components/BadgeButton/BadgeButtonComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { LogoutIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = {
  loggedInUI: boolean;
  handleLoginClick: () => void;
  handleRegisterClick: () => void;
  handleLogoutClick: () => void;
};

export const MainHeaderEndView = memo<Props>(
  ({ loggedInUI, handleLoginClick, handleRegisterClick, handleLogoutClick }) => (
    <div className={style.headerEnd}>
      {loggedInUI ? (
        <ButtonComponent className={style.headerEndLogoutButton} onClick={handleLogoutClick}>
          <LogoutIcon />
        </ButtonComponent>
      ) : (
        <>
          <BadgeButtonComponent
            className={clsx(style.headerEndLoginButton, style.headerEndButton)}
            secondary
            handleClick={handleLoginClick}
          >
            Login
          </BadgeButtonComponent>
          <BadgeButtonComponent className={style.headerEndButton} handleClick={handleRegisterClick}>
            Register
          </BadgeButtonComponent>
        </>
      )}
    </div>
  )
);
