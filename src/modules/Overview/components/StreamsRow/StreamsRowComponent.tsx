import React, { memo } from 'react';

import clsx from 'clsx';

import { DealerOffer } from '~/types/marketTypes';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { TextGradientComponent } from '~/components/TextGradient/TextGradientComponent';
import { TextColouredComponent } from '~/components/TextColoured/TextColouredComponent';
import { ChangeArrowComponent } from '~/components/ChangeArrow/ChangeArrowComponent';

import style from './style.module.scss';

export type Props = {
  offer: DealerOffer<number>;
  bestId?: string | null;
  reversed?: boolean;
};

export const StreamsRowComponent = memo<Props>(({ offer, reversed, bestId }) => {
  const best = bestId === offer.id;

  return (
    <div className={clsx(style.streamsRow, reversed && style.streamsRowReversed, best && style.streamsRowBest)}>
      <div className={style.streamsRowItem}>
        <span className={style.streamsRowValue}>
          <ValueComponent fix={8}>{offer.volume}</ValueComponent>
        </span>
      </div>

      <div className={style.streamsRowItem}>
        <TextGradientComponent className={style.streamsRowValue} positive={!reversed} visible>
          <ValueComponent fix={2}>{offer.price}</ValueComponent>
        </TextGradientComponent>
      </div>

      <div className={style.streamsRowItem}>
        <ChangeArrowComponent
          className={style.streamsRowChangeIcon}
          positive={offer.clientDiff > 0}
          visible={!!offer.clientDiff}
          gradient
        />
        <TextColouredComponent
          className={style.streamsRowValue}
          positive={offer.clientDiff > 0}
          visible={!!offer.clientDiff}
        >
          <ValueComponent after="%" abs>
            {offer.clientDiffPercentage}
          </ValueComponent>
        </TextColouredComponent>
      </div>
    </div>
  );
});
