import React, { FC, RefObject } from 'react';

import { StepsItemComponent } from '~/modules/Corporates/components/StepsItem/StepsItemComponent';
import { LandingHeadingComponent } from '~/modules/Corporates/components/Heading/HeadingComponent';
import { AuthEidDownloadButtonContainer } from '~/modules/CorporateOnboarding/containers/AuthEidDownloadButton/AuthEidDownloadButtonContainer';
import { RegistrationButtonContainer } from '~/modules/CorporateOnboarding/containers/RegistrationButton/RegistrationButtonContainer';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { CorporatesPath } from '~/constants/pathsConstants';

import style from './style.module.scss';

export type Props = {
  className?: string;
  containerRef: RefObject<HTMLDivElement>;
  listRef: RefObject<HTMLUListElement>;
};

export const InstitutionsStepsView: FC<Props> = ({ className, containerRef, listRef }) => (
  <section className={className} id="steps" ref={containerRef}>
    <LandingHeadingComponent
      headline="Explore Leverex as a service"
      pitch="Enterprise-level access to crypto markets"
    />

    <ul className={style.stepsList} ref={listRef}>
      <StepsItemComponent className={style.stepsItemFees} headline="Auth eID app">
        <li className={style.stepsItemListItem}>
          Our corporate onboarding requires to confirm your identity via Auth eID app.
        </li>
        <li className={style.stepsItemListItem}>
          <span>
            If you don’t have Auth eID yet, you can <AuthEidDownloadButtonContainer />.
          </span>
        </li>
      </StepsItemComponent>

      <StepsItemComponent className={style.stepsItemLeverage} headline="Account with Leverex">
        <li className={style.stepsItemListItem}>
          As part of the corporate onboarding we ask that our potential partners already have a personal Leverex account
          created.
        </li>
        <li className={style.stepsItemListItem}>
          <span>
            If you don’t have an account with Leverex, you can <RegistrationButtonContainer />.
          </span>
        </li>
      </StepsItemComponent>

      <StepsItemComponent className={style.stepsItemFlexibility} headline="Corporate onboarding form">
        <li className={style.stepsItemListItem}>
          Fill out our corporate onboarding details and we will be in touch with you shortly.
        </li>
        <li className={style.stepsItemListItem}>
          <span>
            To start filling out the form <LinkComponent href={CorporatesPath.ONBOARDING}>visit here</LinkComponent>.
          </span>
        </li>
      </StepsItemComponent>
    </ul>
  </section>
);
