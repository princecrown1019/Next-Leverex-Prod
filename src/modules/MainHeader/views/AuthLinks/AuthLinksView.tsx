import React, { FC, MouseEvent } from 'react';

import { HeaderLinkComponent } from '~/components/HeaderLink/HeaderLinkComponent';

import style from './style.module.scss';

type Props = {
  loginUrl: string;
  registerUrl: string;
  handleRegisterClick: () => void;
  handleLoginClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const MainHeaderAuthLinksView: FC<Props> = ({
  loginUrl,
  registerUrl,
  handleRegisterClick,
  handleLoginClick
}) => (
  <>
    <HeaderLinkComponent wrapperClassName={style.headerAuthLink} href={loginUrl} onClick={handleLoginClick}>
      Login
    </HeaderLinkComponent>
    <HeaderLinkComponent wrapperClassName={style.headerAuthLink} href={registerUrl} onClick={handleRegisterClick}>
      Register
    </HeaderLinkComponent>
  </>
);
