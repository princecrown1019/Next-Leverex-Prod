import React, { FC } from 'react';

import clsx from 'clsx';

import { Currency } from '~/types/currencyTypes';
import { ChangeArrowThinComponent } from '~/components/ChangeArrowThin/ChangeArrowThinComponent';
import { ValueBlankComponent } from '~/components/ValueBlank/ValueBlankComponent';
import { TagComponent } from '~/components/Tag/TagComponent';
import { ValueComponent } from '~/components/Value/ValueComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  feeLabel?: string;
  ccy: Currency;
  fee: number;
  imChange: number;
  buyingPower: number;
};

export const MarketEstimatesView: FC<Props> = ({ className, fee, feeLabel, imChange, buyingPower, ccy }) => (
  <div className={clsx(style.estimates, className)}>
    <div className={style.estimatesRow}>
      <span className={style.estimatesLabel}>Buying power</span>
      <span className={style.estimatesValue}>
        <ValueComponent>{buyingPower}</ValueComponent>
        {buyingPower ? ` ${ccy}` : null}
      </span>
    </div>

    <div className={style.estimatesRow}>
      <span className={style.estimatesLabel}>Margin change</span>
      <div className={style.estimatesValueWithIcon}>
        <ChangeArrowThinComponent className={style.estimatesValueIcon} positive={imChange > 0} visible={!!imChange} />
        <span className={style.estimatesValue}>
          <ValueBlankComponent abs after={` ${ccy}`}>
            {imChange}
          </ValueBlankComponent>
        </span>
      </div>
    </div>

    <div className={style.estimatesRow}>
      <span className={style.estimatesLabel}>
        Fee <TagComponent>{feeLabel || 'Taker'}</TagComponent>
      </span>
      <span className={style.estimatesValue}>
        <ValueBlankComponent after={` ${ccy}`}>{fee}</ValueBlankComponent>
      </span>
    </div>
  </div>
);
