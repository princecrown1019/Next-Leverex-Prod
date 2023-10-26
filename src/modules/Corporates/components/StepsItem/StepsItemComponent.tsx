import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  headline: string;
  steps?: string[];
  children?: ReactNode | ReactNode[];
};

export const StepsItemComponent: FC<Props> = ({ className, steps, children, headline }) => (
  <li className={clsx(style.stepsItem, className)}>
    <div className={style.stepsItemContent}>
      <h2 className={style.stepsItemHeadline}>{headline}</h2>

      <ul className={style.stepsItemList}>
        {children ||
          steps?.map((step) => (
            <li className={style.stepsItemListItem} key={step}>
              {step}
            </li>
          ))}
      </ul>
    </div>
  </li>
);
