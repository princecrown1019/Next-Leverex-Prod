import React, { FC, ReactNode, RefObject } from 'react';

import clsx from 'clsx';

import { ENV } from '~/constants/configConstants';
import { BadgeButtonComponent } from '~/components/BadgeButton/BadgeButtonComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  anchorRef: RefObject<HTMLAnchorElement>;
  children: ReactNode;
  loadingCsv: boolean;
  handeClick: () => void;
};

export const TradesHeaderEndView: FC<Props> = ({ className, anchorRef, loadingCsv, children, handeClick }) => (
  <div className={clsx(style.tradesHeaderEnd, className)}>
    {children}
    <BadgeButtonComponent className={style.tradesHeaderDownloadButton} disabled={loadingCsv} handleClick={handeClick}>
      {loadingCsv ? 'Loading...' : 'Download'}
    </BadgeButtonComponent>
    <LinkComponent
      className={style.tradesHeaderEndDownloadAnchor}
      download={`leverex-${ENV}-trades-history.csv`}
      target="_blank"
      ref={anchorRef}
    />
  </div>
);
