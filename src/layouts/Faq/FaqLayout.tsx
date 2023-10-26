import React, { FC, ReactNode, useEffect, useRef } from 'react';

import clsx from 'clsx';

import { HeaderMainContainer } from '~/modules/MainHeader/containers/Header/HeaderContainer';
import { LinkNavComponent } from '~/components/LinkNav/LinkNavComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { MainPath } from '~/constants/pathsConstants';

import style from './style.module.scss';

export type Link = {
  label: string;
  Icon: FC<{ className?: string }>;
  isActive?: (pathname: string) => boolean;
  href: string;
};

type Props = {
  className?: string;
  headline: string;
  links: Link[];
  children: ReactNode | ReactNode[];
};

export const FaqLayout: FC<Props> = ({ className, links, headline, children }) => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle(style.faqLayoutNavStickyMobile, entry.intersectionRatio < 1);
      },
      { threshold: [1] }
    );

    observer.observe(navRef.current);

    return () => {
      if (!navRef.current) return;

      observer.unobserve(navRef.current);
    };
  }, []);

  return (
    <>
      <HeaderMainContainer />

      <main className={clsx(style.faqLayout, className)}>
        <nav className={style.faqLayoutNav} ref={navRef}>
          <div className={style.faqLayoutCrumbs}>
            <LinkComponent className={style.faqLayoutCrumbsLink} href={MainPath.FAQ}>
              FAQ
            </LinkComponent>
            <span className={style.faqLayoutCrumbsSeparator}>/</span>
            <span className={style.faqLayoutCrumbsText}>{headline}</span>
          </div>

          <ul className={style.faqLayoutNavList}>
            {links.map(({ label, href, Icon, isActive }) => (
              <li className={clsx(style.faqLayoutNavItem, 'tw-group')} key={label}>
                <LinkNavComponent
                  className={style.faqLayoutNavLink}
                  activeClassName={style.faqLayoutNavLinkActive}
                  isActive={isActive}
                  href={href}
                >
                  <Icon className={style.faqLayoutSidebarIcon} />
                  {label}
                </LinkNavComponent>
              </li>
            ))}
          </ul>
        </nav>

        <section className={style.faqLayoutSection}>
          <h1 className={style.faqLayoutHeadline}>{headline}</h1>

          <div className={style.faqLayoutContent}>{children}</div>
        </section>
      </main>
    </>
  );
};
