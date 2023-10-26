import React, { memo, MouseEvent, RefObject } from 'react';

import clsx from 'clsx';

import { HeaderLinkComponent } from '~/components/HeaderLink/HeaderLinkComponent';
import { HeaderWithProgressBarComponent } from '~/components/HeaderWithProgressBar/HeaderComponent';
import { MainPath } from '~/constants/pathsConstants';
import { MainHeaderAuthLinksContainer } from '~/modules/MainHeader/containers/AuthLinks/AuthLinksContainer';

import style from './style.module.scss';

export type Props = {
  open: boolean;
  referenceProgressBar: RefObject<HTMLDivElement>;
  handleLogoClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  handleBurgerClick: () => void;
};

export const NewsHeaderView = memo<Props>(({ open, referenceProgressBar, handleLogoClick, handleBurgerClick }) => (
  <HeaderWithProgressBarComponent
    className={style.header}
    open={open}
    referenceProgressBar={referenceProgressBar}
    withTradeButton
    handleBurgerClick={handleBurgerClick}
    handleLogoClick={handleLogoClick}
  >
    <MainHeaderAuthLinksContainer />

    <HeaderLinkComponent className={clsx(style.headerLink, style.headerLinkFirst)} href={MainPath.HOME}>
      Individual
    </HeaderLinkComponent>
    <HeaderLinkComponent className={style.headerLink} activeClassName={style.headerLinkActive} href={MainPath.NEWS}>
      News
    </HeaderLinkComponent>
    <HeaderLinkComponent className={style.headerLink} href={MainPath.FAQ}>
      FAQ
    </HeaderLinkComponent>
  </HeaderWithProgressBarComponent>
));
