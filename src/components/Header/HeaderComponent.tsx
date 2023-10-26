import React, { FC, MouseEvent, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import clsx from 'clsx';

import { MainPath } from '~/constants/pathsConstants';
import { FE } from '~/constants/configConstants';
import { useDisabledScroll } from '~/hooks/DisabledScroll/useDisabledScroll';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { BurgerComponent } from '~/components/Burger/BurgerComponent';
import { LinkButtonComponent } from '~/components/LinkButton/LinkButtonComponent';
import { SocialsComponent } from '~/components/Socials/SocialsComponent';
import { EnvelopeIcon } from '~/assets/Icons';
import { selectVersionData } from '~/store/Stats/selectors';

import style from './style.module.scss';

type Props = {
  className?: string;
  brandClassName?: string;
  open: boolean;
  main?: boolean;
  withTradeButton?: boolean;
  headerEnd?: ReactNode;
  children?: ReactNode | ReactNode[];
  handleLogoClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  handleRegisterClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  handleBurgerClick?: () => void;
};

export const HeaderComponent: FC<Props> = ({
  className,
  brandClassName,
  open,
  main,
  withTradeButton,
  headerEnd,
  children,
  handleBurgerClick,
  handleRegisterClick,
  handleLogoClick
}) => {
  useDisabledScroll(open);
  const { pathname } = useRouter();
  const BEVersion = useSelector(selectVersionData);

  return (
    <>
      <header className={clsx(style.header, className, main && style.headerMain, open && style.headerOpen)}>
        <div className={style.headerWrapper}>
          <div className={style.headerWrapperLeft}>
            <h1 className={clsx(style.headerBrand, brandClassName)}>
              <LinkComponent className={style.headerBrandLink} onClick={handleLogoClick} href={MainPath.HOME}>
                Leverex
              </LinkComponent>
            </h1>
            <div className={style.headerWrapperLeftRight}>
              {withTradeButton && (
                <LinkButtonComponent
                  className={clsx(style.headerButtonLink, style.headerButtonLinkMobile)}
                  href={MainPath.EXCHANGE}
                >
                  Trade
                </LinkButtonComponent>
              )}
              <BurgerComponent className={style.headerBurgerMenu} open={open} handleClick={handleBurgerClick} />
            </div>
          </div>

          <nav className={style.headerNav}>
            <ul className={style.headerNavList}>{children}</ul>
          </nav>

          {!!handleRegisterClick && (
            <LinkButtonComponent
              className={clsx(style.headerButtonLink, style.headerButtonLinkRegister)}
              onClick={handleRegisterClick}
            >
              Register
            </LinkButtonComponent>
          )}
          {withTradeButton && (
            <LinkButtonComponent className={style.headerButtonLink} href={MainPath.EXCHANGE}>
              Trade
            </LinkButtonComponent>
          )}

          {pathname !== '/' && (
            <div className={style.versionString}>
              FE: {FE}, BE: {BEVersion.slice(-8)}
            </div>
          )}

          {headerEnd}

          <div className={style.footer}>
            <SocialsComponent className={style.footerSocials} />

            <div className={style.footerEndRight}>
              <LinkComponent
                className={clsx(style.footerText, style.footerLink, style.footerEndLink)}
                href="mailto:hello@leverex.io"
              >
                <EnvelopeIcon className={style.footerEndIcon} />
                hello@leverex.io
              </LinkComponent>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
