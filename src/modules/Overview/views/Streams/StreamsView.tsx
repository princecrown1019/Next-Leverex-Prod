import React, { FC } from 'react';

import { DealerOffer } from '~/types/marketTypes';
import { StreamsHeaderComponent } from '~/modules/Overview/components/StreamsHeader/StreamsHeaderComponent';
import { StreamsIndexPriceContainer } from '~/modules/Overview/containers/IndexPrice/IndexPriceContainer';
import { StreamsRowComponent } from '~/modules/Overview/components/StreamsRow/StreamsRowComponent';
import { LoadingWrapperComponent } from '~/components/LoadingWrapper/LoadingWrapperComponent';
import { EmptyWrapperComponent } from '~/components/EmptyWrapper/EmptyWrapperComponent';

import style from './style.module.scss';

export type Props = {
  loading: boolean;
  bestId?: string | null;
  offersBuy: DealerOffer<number>[];
  offersSell: DealerOffer<number>[];
};

export const StreamsView: FC<Props> = ({ loading, offersBuy, offersSell, bestId }) => (
  <LoadingWrapperComponent visible={loading}>
    <EmptyWrapperComponent
      visible={!offersBuy.length && !offersSell.length}
      message="Currently, there are no working dealers"
    >
      <div className={style.streams}>
        <StreamsHeaderComponent>
          <StreamsIndexPriceContainer />
        </StreamsHeaderComponent>

        <div className={style.streamsBody}>
          <div className={style.streamsBodySide}>
            {offersBuy.map((offer) => (
              <StreamsRowComponent offer={offer} key={offer.id} bestId={bestId} />
            ))}
          </div>

          <div className={style.streamsBodyIndexGap} />

          <div className={style.streamsBodySide}>
            {offersSell.map((offer) => (
              <StreamsRowComponent offer={offer} key={offer.id} bestId={bestId} reversed />
            ))}
          </div>
        </div>
      </div>
    </EmptyWrapperComponent>
  </LoadingWrapperComponent>
);
