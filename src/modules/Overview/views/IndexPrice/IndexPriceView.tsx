import React, { FC } from 'react';

import { BadgeButtonComponent } from '~/components/BadgeButton/BadgeButtonComponent';
import { ValueComponent } from '~/components/Value/ValueComponent';

import style from './style.module.scss';

type Props = {
  liveCutOffPrice: number;
};

export const OverviewStreamsIndexPriceView: FC<Props> = ({ liveCutOffPrice }) => (
  <BadgeButtonComponent className={style.streamsIndexPrice} disabled>
    <ValueComponent>{liveCutOffPrice}</ValueComponent>
  </BadgeButtonComponent>
);
