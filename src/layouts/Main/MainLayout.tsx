import React, { FC, ReactNode } from 'react';

import { HeaderMainContainer } from '~/modules/MainHeader/containers/Header/HeaderContainer';
import { SessionHealthContainer } from '~/modules/Trade/containers/SessionHealth/SessionHealthContainer';

import style from './style.module.scss';

type Props = {
  className?: string;
  children: ReactNode | ReactNode[];
};

export const MainLayout: FC<Props> = ({ className, children }) => (
  <>
    <HeaderMainContainer withoutBottomBorder />
    <main className={style.mainLayout}>
      <div className={className}>{children}</div>
      <SessionHealthContainer className={style.mainLayoutHealth} />
    </main>
  </>
);
