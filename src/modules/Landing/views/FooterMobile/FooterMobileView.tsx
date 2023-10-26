import React, { FC } from 'react';

import clsx from 'clsx';

import { API_DOC_URL, INFO_EMAIL, PRODUCT_SPECIFICATION_USDT_URL } from '~/constants/configConstants';
import { MainPath, StaticPath } from '~/constants/pathsConstants';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { LinkButtonComponent } from '~/components/LinkButton/LinkButtonComponent';
import { LandingSocialsComponent } from '~/modules/Landing/components/Socials/SocialsComponent';
import { EnvelopeIcon } from '~/assets/Icons';

import style from './style.module.scss';

export type Props = {
  className?: string;
  linkHref: string;
  linkLabel: string;
};

export const LandingFooterMobileView: FC<Props> = ({ className, linkHref, linkLabel }) => (
  <footer className={className}>
    <div className={style.footer}>
      <div className={style.footerWrapper}>
        <div className={style.footerLinksLists}>
          <div className={style.footerLinksListContainer}>
            <h6 className={style.footerLinksHeadline}>Company</h6>
            <ul className={style.footerLinksList}>
              <li className={style.footerLinksListItem}>
                <LinkComponent className={clsx(style.footerText, style.footerLink)} href={StaticPath.ABOUT_US}>
                  About us
                </LinkComponent>
              </li>
              <li className={style.footerLinksListItem}>
                <LinkComponent className={clsx(style.footerText, style.footerLink)} href={MainPath.NEWS}>
                  News
                </LinkComponent>
              </li>
            </ul>

            <LinkButtonComponent
              className={clsx(style.footerButtonLink, style.footerButtonLinkTablet)}
              href={linkHref}
              target="_blank"
            >
              {linkLabel}
            </LinkButtonComponent>
          </div>

          <div className={style.footerLinksListContainer}>
            <h6 className={style.footerLinksHeadline}>Terms & Policies</h6>
            <ul className={style.footerLinksList}>
              <li className={style.footerLinksListItem}>
                <LinkComponent className={clsx(style.footerText, style.footerLink)} href={StaticPath.REGULATION}>
                  Regulation
                </LinkComponent>
              </li>
              <li className={style.footerLinksListItem}>
                <LinkComponent className={clsx(style.footerText, style.footerLink)} href={StaticPath.TERMS_OF_USE}>
                  Terms of use
                </LinkComponent>
              </li>
              <li className={style.footerLinksListItem}>
                <LinkComponent className={clsx(style.footerText, style.footerLink)} href={StaticPath.PRIVACY_POLICY}>
                  Privacy Policy
                </LinkComponent>
              </li>
              <li className={style.footerLinksListItem}>
                <LinkComponent
                  className={clsx(style.footerText, style.footerLink)}
                  href={StaticPath.PARTICIPANT_AGREEMENT}
                >
                  Participant Agreement
                </LinkComponent>
              </li>
            </ul>
          </div>

          <div className={style.footerLinksListContainer}>
            <h6 className={style.footerLinksHeadline}>Documentation</h6>
            <ul className={style.footerLinksList}>
              <li className={style.footerLinksListItem}>
                <LinkComponent className={clsx(style.footerText, style.footerLink)} href={API_DOC_URL} target="_blank">
                  API
                </LinkComponent>
              </li>
              <li className={style.footerLinksListItem}>
                <LinkComponent
                  className={clsx(style.footerText, style.footerLink)}
                  href={PRODUCT_SPECIFICATION_USDT_URL}
                  target="_blank"
                >
                  Product Specification
                </LinkComponent>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <LinkButtonComponent
        className={clsx(style.footerButtonLink, style.footerButtonLinkMobile)}
        href={linkHref}
        target="_blank"
      >
        {linkLabel}
      </LinkButtonComponent>
    </div>

    <div className={style.footerEnd}>
      <div className={clsx(style.footerWrapper, style.footerEndInner)}>
        <h1 className={clsx(style.footerBrand, style.footerBrand)}>
          <LinkComponent className={style.footerBrandLink} href={MainPath.HOME}>
            Leverex
          </LinkComponent>
        </h1>

        <LandingSocialsComponent className={style.footerSocialsListMobile} />

        <div className={style.footerEndRight}>
          <LinkComponent
            className={clsx(style.footerText, style.footerLink, style.footerEndLink)}
            href={`mailto:${INFO_EMAIL}`}
          >
            <EnvelopeIcon className={style.footerEndIcon} />
            {INFO_EMAIL}
          </LinkComponent>
        </div>
      </div>
    </div>
  </footer>
);
