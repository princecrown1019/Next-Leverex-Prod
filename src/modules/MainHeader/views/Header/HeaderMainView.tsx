import React, { memo } from 'react';

import clsx from 'clsx';

import { AccountPath, MainPath } from '~/constants/pathsConstants';
import { MainHeaderEndContainer } from '~/modules/MainHeader/containers/HeaderEnd/HeaderMainEndContainer';
import { MainHeaderAuthLinksContainer } from '~/modules/MainHeader/containers/AuthLinks/AuthLinksContainer';
import { HeaderLinkComponent } from '~/components/HeaderLink/HeaderLinkComponent';
import { HeaderComponent } from '~/components/Header/HeaderComponent';
import { DashboardIcon, HelpIcon, TradeIcon } from '~/assets/Icons';

import style from './style.module.scss';

export type Props = {
  open: boolean;
  loggedInUI: boolean;
  exchangeActive: (path: string) => boolean;
  faqActive: (path: string) => boolean;
  accountActive: (path: string) => boolean;
  withoutBottomBorder?: boolean;
  handleBurgerClick: () => void;
  handleLogoutClick: () => void;
};

export const MainHeaderView = memo<Props>(
  ({
    open,
    withoutBottomBorder,
    loggedInUI,
    exchangeActive,
    faqActive,
    accountActive,
    handleBurgerClick,
    handleLogoutClick
  }) => (
    <HeaderComponent
      className={clsx(style.headerMain, withoutBottomBorder && style.headerMainWithoutBorder)}
      brandClassName={style.headerMainBrand}
      open={open}
      main
      headerEnd={<MainHeaderEndContainer />}
      handleBurgerClick={handleBurgerClick}
    >
      <MainHeaderAuthLinksContainer />
      <HeaderLinkComponent
        className={style.headerMainLink}
        wrapperClassName={style.headerMainLinkWrapperTopMargin}
        activeClassName={style.headerMainLinkActive}
        href={MainPath.EXCHANGE}
        isActive={exchangeActive}
      >
        <TradeIcon className={style.headerMainLinkIcon} />
        Trade
      </HeaderLinkComponent>
      {loggedInUI && (
        <>
          <HeaderLinkComponent
            className={style.headerMainLink}
            activeClassName={style.headerMainLinkActive}
            href={AccountPath.DASHBOARD}
            isActive={accountActive}
          >
            <DashboardIcon className={style.headerMainLinkIcon} />
            Account
          </HeaderLinkComponent>
        </>
      )}
      <HeaderLinkComponent
        className={style.headerMainLink}
        activeClassName={style.headerMainLinkActive}
        href={MainPath.FAQ}
        isActive={faqActive}
      >
        <HelpIcon className={style.headerMainLinkIcon} />
        FAQ
      </HeaderLinkComponent>
      {loggedInUI && (
        <HeaderLinkComponent
          className={style.headerMainLinkMobileOnly}
          wrapperClassName={style.headerMainLinkWrapperTopMargin}
          href={MainPath.EXCHANGE}
          onClick={handleLogoutClick}
        >
          Logout
        </HeaderLinkComponent>
      )}
    </HeaderComponent>
  )
);
