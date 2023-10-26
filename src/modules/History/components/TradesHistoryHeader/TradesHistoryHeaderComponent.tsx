import React, { FC } from 'react';

import { Ticker } from '~/types/currencyTypes';
import { TradesAccordionColumnComponent } from '~/modules/History/components/TradesAccordionColumn/TradesAccordionColumnComponent';

import style from './style.module.scss';

type Props = {
  ticker: Ticker;
};

export const TradesHistoryHeaderComponent: FC<Props> = ({ ticker }) => {
  return (
    <div className={style.positionsHeader}>
      <TradesAccordionColumnComponent>
        <span className={style.positionsHeaderLabel}>Date (UTC)</span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.positionsHeaderLabel}>Side</span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.positionsHeaderLabel}>Volume ({ticker})</span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.positionsHeaderLabel}>Open</span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.positionsHeaderLabel}>Closed</span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.positionsHeaderLabel}>Fee</span>
      </TradesAccordionColumnComponent>

      <TradesAccordionColumnComponent>
        <span className={style.positionsHeaderLabel}>Realized P/L</span>
      </TradesAccordionColumnComponent>
    </div>
  );
};
