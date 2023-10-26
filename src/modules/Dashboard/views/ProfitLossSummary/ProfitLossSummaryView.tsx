import React, { FC } from 'react';

import clsx from 'clsx';

import { ValueBlankComponent } from '~/components/ValueBlank/ValueBlankComponent';
import { ProfitLossItemComponent } from '~/modules/Dashboard/components/ProfitLossItem/ProfitLossItemComponent';
import { TextColouredComponent } from '~/components/TextColoured/TextColouredComponent';
import { LoadingSessionWrapperComponent } from '~/components/LoadingSessionWrapper/LoadingSessionWrapperComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  currentSession: number;
  currentDay: number;
  pastWeek: number;
  pastMonth: number;
  pastYear: number;
  allTime: number;
};

export const ProfitLossSummaryView: FC<Props> = ({
  className,
  currentSession,
  currentDay,
  pastWeek,
  pastMonth,
  pastYear,
  allTime
}) => (
  <LoadingSessionWrapperComponent className={clsx(style.dashboardProfitLoss, className)}>
    <ProfitLossItemComponent label="Current session P/L">
      <TextColouredComponent positive={currentSession > 0} visible={!!currentSession}>
        <ValueBlankComponent withPositiveChar>{currentSession}</ValueBlankComponent>
      </TextColouredComponent>
    </ProfitLossItemComponent>

    <ProfitLossItemComponent label="Current day P/L">
      <TextColouredComponent positive={currentDay > 0} visible={!!currentDay}>
        <ValueBlankComponent withPositiveChar>{currentDay}</ValueBlankComponent>
      </TextColouredComponent>
    </ProfitLossItemComponent>

    <ProfitLossItemComponent label="Past week P/L">
      <TextColouredComponent positive={pastWeek > 0} visible={!!pastWeek}>
        <ValueBlankComponent withPositiveChar>{pastWeek}</ValueBlankComponent>
      </TextColouredComponent>
    </ProfitLossItemComponent>

    <ProfitLossItemComponent label="Past month P/L">
      <TextColouredComponent positive={pastMonth > 0} visible={!!pastMonth}>
        <ValueBlankComponent withPositiveChar>{pastMonth}</ValueBlankComponent>
      </TextColouredComponent>
    </ProfitLossItemComponent>

    <ProfitLossItemComponent label="Past year P/L">
      <TextColouredComponent positive={pastYear > 0} visible={!!pastYear}>
        <ValueBlankComponent withPositiveChar>{pastYear}</ValueBlankComponent>
      </TextColouredComponent>
    </ProfitLossItemComponent>

    <ProfitLossItemComponent label="All-time P/L">
      <TextColouredComponent positive={allTime > 0} visible={!!allTime}>
        <ValueBlankComponent withPositiveChar>{allTime}</ValueBlankComponent>
      </TextColouredComponent>
    </ProfitLossItemComponent>
  </LoadingSessionWrapperComponent>
);
