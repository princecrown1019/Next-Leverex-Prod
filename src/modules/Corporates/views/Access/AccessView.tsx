import React, { FC, RefObject } from 'react';

import clsx from 'clsx';

import { LandingHeadingComponent } from '~/modules/Corporates/components/Heading/HeadingComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  containerRef: RefObject<HTMLDivElement>;
  listRef: RefObject<HTMLUListElement>;
  isOnScreen: boolean;
};

export const InstitutionsAccessView: FC<Props> = ({ className, containerRef, listRef }) => (
  <section className={clsx(style.access, className)} id="tools" ref={containerRef}>
    <LandingHeadingComponent
      headline="Enabling crypto access for a range of corporates"
      pitch="Advanced security, stable rails"
    />

    <ul className={style.accessList} ref={listRef}>
      <li className={style.accessListItem}>
        <div className={style.accessListItemPlaceholder}>
          <h3 className={style.accessListItemHeadline}>Brokers</h3>
          <p className={style.accessListItemDescription}>
            Access markets that never close. Expand your offering across top cryptocurrency assets with a partner who
            ensures regulatory clarity.
          </p>
        </div>
      </li>
      <li className={style.accessListItem}>
        <div className={style.accessListItemPlaceholder}>
          <h3 className={style.accessListItemHeadline}>Hedge Funds</h3>
          <p className={style.accessListItemDescription}>
            Expand your portfolio through crypto markets and execution services.
          </p>
        </div>
      </li>
      <li className={style.accessListItem}>
        <div className={style.accessListItemPlaceholder}>
          <h3 className={style.accessListItemHeadline}>Family Offices</h3>
          <p className={style.accessListItemDescription}>
            Get direct access to crypto markets through proven architecture featuring industry-leading security.
          </p>
        </div>
      </li>
      <li className={style.accessListItem}>
        <div className={style.accessListItemPlaceholder}>
          <h3 className={style.accessListItemHeadline}>Neo banks</h3>
          <p className={style.accessListItemDescription}>
            Leverage existing infrastructure to create your custom crypto offer. Eliminate barriers to entry into
            digital currency markets.
          </p>
        </div>
      </li>
      <li className={style.accessListItem}>
        <div className={style.accessListItemPlaceholder}>
          <h3 className={style.accessListItemHeadline}>Prop Traders</h3>
          <p className={style.accessListItemDescription}>
            Put your experience to work on quickly growing markets that never close.
          </p>
        </div>
      </li>
      <li className={style.accessListItem}>
        <div className={style.accessListItemPlaceholder}>
          <h3 className={style.accessListItemHeadline}>Aggregators</h3>
          <p className={style.accessListItemDescription}>
            Connect through the fastest APIs in crypto and leverage our markets.
          </p>
        </div>
      </li>
    </ul>
  </section>
);
