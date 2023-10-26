import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';

import clsx from 'clsx';

import { LinkButtonComponent } from '~/components/LinkButton/LinkButtonComponent';
import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  loginUrl: null | string;
  handleLoginClick: () => void;
  handleRegisterClick: () => void;
};

export const ProtectedWidgetView: FC<Props> = ({ className, loginUrl, handleLoginClick, handleRegisterClick }) => (
  <div className={clsx(style.protectedWidget, className)}>
    <h6 className={style.protectedWidgetHeadline}>Please Login or Register to trade</h6>

    {isMobile ? (
      <LinkButtonComponent
        className={clsx(style.protectedWidgetButton, style.protectedWidgetButtonLogin)}
        href={loginUrl}
        target="_blank"
      >
        Login
      </LinkButtonComponent>
    ) : (
      <ActionButtonComponent
        className={clsx(style.protectedWidgetButton, style.protectedWidgetButtonLogin)}
        handleClick={handleLoginClick}
      >
        Login
      </ActionButtonComponent>
    )}

    <ActionButtonComponent
      className={clsx(style.protectedWidgetButton, style.protectedWidgetButtonRegister)}
      transparent
      handleClick={handleRegisterClick}
    >
      Register
    </ActionButtonComponent>
  </div>
);
