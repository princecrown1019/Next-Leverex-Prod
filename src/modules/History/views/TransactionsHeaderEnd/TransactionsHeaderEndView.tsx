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
  handeClick: () => void;
};

export const TransactionsHeaderEndView: FC<Props> = ({ className, anchorRef, children, handeClick }) => (
  <div className={clsx(style.transactionsHeaderEnd, className)}>
    {children}
    <BadgeButtonComponent handleClick={handeClick}>Download</BadgeButtonComponent>
    <LinkComponent
      className={style.transactionsHeaderEndDownloadAnchor}
      download={`leverex-${ENV}-transactions-history.csv`}
      target="_blank"
      ref={anchorRef}
    />
  </div>
);
