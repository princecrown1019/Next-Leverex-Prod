import React, { FC, ReactNode, RefObject } from 'react';

import clsx from 'clsx';

import { AUTH_EID_WEBSITE_URL, LIQUID_NETWORK_WEBSITE_URL } from '~/constants/configConstants';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { ImgComponent } from '~/components/Img/ImgComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  headline: ReactNode;
  pitch: ReactNode;
  imgContainerRef: RefObject<HTMLDivElement>;
  handleImgLoad: () => void;
};

export const LandingIntroView: FC<Props> = ({ className, headline, pitch, imgContainerRef, handleImgLoad }) => (
  <section className={clsx(style.intro, className)}>
    <div className={clsx(style.introHalf, style.introHalfContent)}>
      <div className={style.introHalfContentInner}>
        <h2 className={style.introHeadline}>{headline}</h2>
        <div className={style.introPitch}>{pitch}</div>

        <ul className={style.introPartnersList}>
          <li className={style.introPartnersListItem}>
            <LinkComponent
              className={clsx(style.introPartnersListLink, style.introPartnersLiquidNetwork)}
              href={LIQUID_NETWORK_WEBSITE_URL}
              target="_blank"
            >
              Liquid Network
            </LinkComponent>
          </li>
          <li className={style.introPartnersListItem}>
            <LinkComponent
              className={clsx(style.introPartnersListLink, style.introPartnersAuthEid)}
              href={AUTH_EID_WEBSITE_URL}
              target="_blank"
            >
              Auth eID
            </LinkComponent>
          </li>
        </ul>
      </div>
    </div>
    <div className={clsx(style.introHalf, style.introHalfPresentation)}>
      <div className={style.introPresentation} ref={imgContainerRef}>
        <ImgComponent
          className={style.introPresentationImage}
          src="/static/media/landing/exchange-screenshot-half.svg"
          alt="Exchange page screenshot"
          onLoad={handleImgLoad}
          withoutAnimation
        />
      </div>
    </div>
  </section>
);
