import React, { FC } from 'react';

import clsx from 'clsx';

import { Currency, Ticker } from '~/types/currencyTypes';
import { useMedia } from '~/hooks/Media/useMedia';
import { PositionsAccordionColumnComponent } from '~/modules/Positions/components/AccordionColumn/AccordionColumnComponent';

import style from './style.module.scss';

type Props = {
  currency: Currency;
  ticker: Ticker;
  cancel?: boolean;
};

export const PositionsTableHeaderComponent: FC<Props> = ({ currency, ticker, cancel }) => {
  const smMedia = useMedia(1100.98);

  return (
    <div className={clsx(style.positionsTableHeader, cancel && style.positionsTableCancel)}>
      <PositionsAccordionColumnComponent>
        <span className={style.positionsTableHeaderLabel}>Product</span>
      </PositionsAccordionColumnComponent>

      <PositionsAccordionColumnComponent>
        <span className={style.positionsTableHeaderLabel}>Price ({currency})</span>
      </PositionsAccordionColumnComponent>

      <PositionsAccordionColumnComponent>
        <span className={style.positionsTableHeaderLabel}>Net Exposure ({ticker})</span>
      </PositionsAccordionColumnComponent>

      <PositionsAccordionColumnComponent cancel={cancel}>
        {cancel ? null : (
          <span className={style.positionsTableHeaderLabel}>
            {smMedia ? `P/L (${currency})` : `Expected P/L (${currency})`}
          </span>
        )}
      </PositionsAccordionColumnComponent>
    </div>
  );
};
