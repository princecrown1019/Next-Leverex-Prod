import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  headline: string;
  features?: string[];
  children?: ReactNode | ReactNode[];
};

export const FeaturesItemComponent: FC<Props> = ({ className, features = [], headline, children }) => (
  <li className={clsx(style.featuresItem, className)}>
    <div className={style.featuresItemContent}>
      <h2 className={style.featuresItemHeadline}>{headline}</h2>

      <ul className={style.featuresItemList}>
        {children ||
          features.map((feacture) => (
            <li className={style.featuresItemListItem} key={feacture}>
              {feacture}
            </li>
          ))}
      </ul>
    </div>
  </li>
);
