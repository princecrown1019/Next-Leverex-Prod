import React, { FC } from 'react';

import style from './style.module.scss';

type Props = {
  headline: string;
  pitch: string;
};

export const LandingHeadingComponent: FC<Props> = ({ headline, pitch }) => (
  <>
    <h2 className={style.headline}>{headline}</h2>
    <p className={style.pitch}>{pitch}</p>
  </>
);
