import React, { memo, MouseEvent, RefObject } from 'react';

import clsx from 'clsx';

import { HeaderLinkComponent } from '~/components/HeaderLink/HeaderLinkComponent';
import { HeaderComponent } from '~/components/Header/HeaderComponent';
import { MainPath } from '~/constants/pathsConstants';
import { MainHeaderAuthLinksContainer } from '~/modules/MainHeader/containers/AuthLinks/AuthLinksContainer';

import style from './style.module.scss';

export type Props = {
  open: boolean;
  featuresLinkRef: RefObject<HTMLAnchorElement>;
  toolsLinkRef: RefObject<HTMLAnchorElement>;
  exploreLinkRef: RefObject<HTMLAnchorElement>;
  handleFeaturesClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  handleToolsClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  handleExploreClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  handleBurgerClick: () => void;
};

export const InstitutionsHeaderView = memo<Props>(
  ({
    open,
    // featuresLinkRef,
    // toolsLinkRef,
    // exploreLinkRef,
    // handleExploreClick,
    // handleFeaturesClick,
    // handleToolsClick,
    handleBurgerClick
  }) => (
    <HeaderComponent
      className={style.header}
      brandClassName={style.headerBrand}
      open={open}
      handleBurgerClick={handleBurgerClick}
    >
      <MainHeaderAuthLinksContainer />
      {/*<HeaderLinkComponent*/}
      {/*  className={style.headerLink}*/}
      {/*  wrapperClassName={style.headerLinkWrapper}*/}
      {/*  href="#features"*/}
      {/*  ref={featuresLinkRef}*/}
      {/*  onClick={handleFeaturesClick}*/}
      {/*>*/}
      {/*  Step-by-step*/}
      {/*</HeaderLinkComponent>*/}
      {/*<HeaderLinkComponent*/}
      {/*  className={style.headerLink}*/}
      {/*  wrapperClassName={style.headerLinkWrapper}*/}
      {/*  href="#tools"*/}
      {/*  ref={toolsLinkRef}*/}
      {/*  onClick={handleToolsClick}*/}
      {/*>*/}
      {/*  Access*/}
      {/*</HeaderLinkComponent>*/}
      {/*<HeaderLinkComponent*/}
      {/*  className={style.headerLink}*/}
      {/*  wrapperClassName={style.headerLinkWrapper}*/}
      {/*  href="#explore"*/}
      {/*  ref={exploreLinkRef}*/}
      {/*  onClick={handleExploreClick}*/}
      {/*>*/}
      {/*  Placeholder*/}
      {/*</HeaderLinkComponent>*/}
      <HeaderLinkComponent className={clsx(style.headerLink, style.headerLinkFirst)} href={MainPath.HOME}>
        Individual
      </HeaderLinkComponent>
      <HeaderLinkComponent className={style.headerLink} href={MainPath.NEWS}>
        News
      </HeaderLinkComponent>
      <HeaderLinkComponent className={style.headerLink} href={MainPath.FAQ}>
        FAQ
      </HeaderLinkComponent>
    </HeaderComponent>
  )
);
