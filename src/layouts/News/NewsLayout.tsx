import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { useDefaultStyles } from '~/hooks/StaticLayout/useDefaultStyles';
import { LandingFooterContainer } from '~/modules/Landing/containers/Footer/FooterContainer';

import style from './style.module.scss';

type Props = {
  className?: string;
  headline: string;
  description?: string;
  children: ReactNode | ReactNode[];
};

export const NewsLayout: FC<Props> = ({ className, headline, description, children }) => {
  useDefaultStyles();

  return (
    <>
      <main className={clsx(style.newsLayout, className)}>
        <header className={clsx(style.newsLayoutWrapper, style.newsLayoutContentHeader)}>
          <h1 className={style.newsLayoutHeadline}>{headline}</h1>
          <p className={style.newsLayoutDescription}>{description}</p>
        </header>

        <div className={clsx(style.newsLayoutWrapper, style.newsLayoutContent)}>{children}</div>

        <LandingFooterContainer className={style.newsFooter} />
      </main>
    </>
  );
};
