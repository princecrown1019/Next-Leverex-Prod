import React, { FC, RefObject } from 'react';

import clsx from 'clsx';

import { StaticPath } from '~/constants/pathsConstants';
import { LinkComponent } from '~/components/Link/LinkComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  containerRef: RefObject<HTMLDivElement>;
};

export const LandingBenefitsView: FC<Props> = ({ className, containerRef }) => (
  <section className={clsx(style.benefits, className)} ref={containerRef}>
    <LinkComponent className={style.benefitsLink} href={StaticPath.MARKET_PROGRAM}>
      <h2 className={style.benefitsHeadline}>Benefit from Leverex&apos;s market maker program</h2>
      <span className={style.benefitButton}>Read more</span>
    </LinkComponent>
  </section>
);
