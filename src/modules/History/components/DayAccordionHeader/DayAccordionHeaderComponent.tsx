import React, { FC } from 'react';

import clsx from 'clsx';

import { VisibleActionIconComponent } from '~/components/VisibleActionIcon/VisibleActionIconComponent';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { ChangeArrowComponent } from '~/components/ChangeArrow/ChangeArrowComponent';
import { TextColouredComponent } from '~/components/TextColoured/TextColouredComponent';
import { ValueBlankComponent } from '~/components/ValueBlank/ValueBlankComponent';
import { TradesAccordionColumnComponent } from '~/modules/History/components/TradesAccordionColumn/TradesAccordionColumnComponent';

import style from './style.module.scss';

type Props = {
  visible: boolean;
  date: string;
  volume: number;
  profitLoss: number;
  loading: boolean;
  close: number;
  open: number;
  fee: number;
};

export const DayAccordionHeaderComponent: FC<Props> = ({
  visible,
  date,
  volume,
  open,
  close,
  loading,
  fee,
  profitLoss
}) => (
  <div className={style.dayAccordionHeader}>
    <TradesAccordionColumnComponent>
      <VisibleActionIconComponent className={style.dayAccordionHeaderIcon} visible={visible} />
      <span className={clsx(style.dayAccordionHeaderValue, style.dayAccordionHeaderValueMarginRight)}>{date}</span>
      {loading && <span className={style.dayAccordionHeaderLoading}>Loading...</span>}
    </TradesAccordionColumnComponent>

    <TradesAccordionColumnComponent />

    <TradesAccordionColumnComponent>
      <span className={style.dayAccordionHeaderValue}>
        <ValueComponent fix={8} abs>
          {volume}
        </ValueComponent>
      </span>
    </TradesAccordionColumnComponent>

    <TradesAccordionColumnComponent>
      <span className={style.dayAccordionHeaderValue}>
        <ValueBlankComponent>{open}</ValueBlankComponent>
      </span>
    </TradesAccordionColumnComponent>

    <TradesAccordionColumnComponent>
      <span className={style.dayAccordionHeaderValue}>
        <ValueBlankComponent>{close}</ValueBlankComponent>
      </span>
    </TradesAccordionColumnComponent>

    <TradesAccordionColumnComponent>
      <span className={style.dayAccordionHeaderValue}>
        <ValueBlankComponent>{fee}</ValueBlankComponent>
      </span>
    </TradesAccordionColumnComponent>

    <TradesAccordionColumnComponent>
      <ChangeArrowComponent
        className={style.dayAccordionHeaderChangeIcon}
        positive={profitLoss > 0}
        visible={!!profitLoss}
      />
      <TextColouredComponent className={style.dayAccordionHeaderValue} positive={profitLoss > 0} visible={!!profitLoss}>
        <ValueComponent withPositiveChar>{profitLoss}</ValueComponent>
      </TextColouredComponent>
    </TradesAccordionColumnComponent>
  </div>
);
