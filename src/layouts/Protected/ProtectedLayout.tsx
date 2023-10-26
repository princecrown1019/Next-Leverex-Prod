import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { HeaderMainContainer } from '~/modules/MainHeader/containers/Header/HeaderContainer';
import { LinkNavComponent } from '~/components/LinkNav/LinkNavComponent';
import { LoadingSessionWrapperComponent } from '~/components/LoadingSessionWrapper/LoadingSessionWrapperComponent';
import { ProductSelectorContainer } from '~/modules/ProductSelector/containers/Selector/SelectorContainer';

import style from './style.module.scss';

export type Link = {
  label: string;
  Icon: FC<{ className?: string }>;
  isActive?: (pathname: string) => boolean;
  href: string;
};

type Props = {
  className?: string;
  links: Link[];
  withoutBackground?: boolean;
  children: ReactNode | ReactNode[];
};

export const ProtectedLayout: FC<Props> = ({ className, links, withoutBackground, children }) => (
  <>
    <HeaderMainContainer withoutBottomBorder />
    <main className={clsx(style.protectedLayout, className)}>
      <LoadingSessionWrapperComponent className={style.protectedLayoutNavContainer}>
        <ProductSelectorContainer />
        <nav className={style.protectedLayoutNav}>
          <ul className={style.protectedLayoutNavList}>
            {links.map(({ label, href, Icon, isActive }) => (
              <li className={clsx(style.protectedLayoutNavItem, 'tw-group')} key={label}>
                <LinkNavComponent
                  className={style.protectedLayoutNavLink}
                  activeClassName={style.protectedLayoutNavLinkActive}
                  isActive={isActive}
                  href={href}
                >
                  <Icon className={style.protectedLayoutSidebarIcon} />
                  {label}
                </LinkNavComponent>
              </li>
            ))}
          </ul>
        </nav>
      </LoadingSessionWrapperComponent>
      {withoutBackground ? (
        <div className={clsx(style.protectedLayoutContent, style.protectedLayoutContentWithoutBg)}>{children}</div>
      ) : (
        <LoadingSessionWrapperComponent className={style.protectedLayoutContent}>
          {children}
        </LoadingSessionWrapperComponent>
      )}
    </main>
  </>
);
