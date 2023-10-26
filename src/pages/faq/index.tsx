import React from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import clsx from 'clsx';

import { faqPagePaths } from '~/constants/pathsConstants';
import { HeaderMainContainer } from '~/modules/MainHeader/containers/Header/HeaderContainer';
import { LinkNavComponent } from '~/components/LinkNav/LinkNavComponent';
import { OpenGraphComponent } from '~/components/OpenGraph/OpenGraphComponent';

import style from './style.module.scss';

const Faq: NextPage = () => {
  return (
    <>
      <Head>
        <title>FAQ</title>

        <OpenGraphComponent title="FAQ" description="FAQ" />
      </Head>

      <HeaderMainContainer />

      <main className={style.faqContainer}>
        <nav className={style.faqNav}>
          <ul className={style.faqNavList}>
            {faqPagePaths.map(({ label, href, Icon }) => (
              <li className={clsx(style.faqNavListItem, 'tw-group')} key={label}>
                <LinkNavComponent className={style.faqNavListLink} href={href}>
                  <Icon className={style.faqNavListItemIcon} />
                  <span className={style.faqNavListItemLabel}>{label}</span>
                </LinkNavComponent>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  );
};

export default Faq;
