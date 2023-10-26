import React, { FC, ReactNode, RefObject } from 'react';

import clsx from 'clsx';

import { LinkButtonComponent } from '~/components/LinkButton/LinkButtonComponent';
import { CorporatesPath } from '~/constants/pathsConstants';

import style from './style.module.scss';

export type Props = {
  className?: string;
  headline: ReactNode;
  pitch: ReactNode;
  imgContainerRef: RefObject<HTMLDivElement>;
  handleImgLoad: () => void;
};

export const InstitutionsIntroView: FC<Props> = ({ className, headline, pitch }) => (
  <section className={clsx(style.intro, className)}>
    <div className={clsx(style.introHalf, style.introHalfContent)}>
      <div className={style.introHalfContentInner}>
        <h2 className={style.introHeadline}>{headline}</h2>
        <div className={style.introPitch}>{pitch}</div>
        <LinkButtonComponent className={style.introButton} href={CorporatesPath.ONBOARDING}>
          Start onboarding
        </LinkButtonComponent>
      </div>
    </div>
  </section>
);
