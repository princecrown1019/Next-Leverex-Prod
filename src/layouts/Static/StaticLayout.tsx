import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { ButtonBackComponent } from '~/components/ButtonBack/ButtonBackComponent';
import { useDefaultStyles } from '~/hooks/StaticLayout/useDefaultStyles';
import { CloseIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = {
  className?: string;
  headline: string;
  children: ReactNode | ReactNode[];
};

export const StaticLayout: FC<Props> = ({ className, headline, children }) => {
  useDefaultStyles();

  return (
    <>
      <aside>
        <ButtonBackComponent className={style.staticLayoutBackButton}>
          <CloseIcon className={style.staticLayoutBackButtonIcon} />
        </ButtonBackComponent>
      </aside>

      <main className={clsx(style.staticLayout, className)}>
        <header className={style.staticLayoutWrapper}>
          <h1 className={style.staticLayoutHeadline}>{headline}</h1>
        </header>

        <article className={clsx(style.staticLayoutWrapper, style.staticLayoutContent)}>{children}</article>
      </main>
    </>
  );
};
