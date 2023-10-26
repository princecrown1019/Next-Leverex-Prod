import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import {
  selectAllTimeProfitLoss,
  selectDayProfitLoss,
  selectMonthProfitLoss,
  selectWeekProfitLoss,
  selectYearProfitLoss,
  selectSessionProfitLoss
} from '~/store/ProfitsLosses/selectors';
import { useLoadProfitLossCommand } from '~/modules/Dashboard/commands/LoadProfitLoss/useLoadProfitLossCommand';
import {
  ProfitLossSummaryView,
  Props as ViewProps
} from '~/modules/Dashboard/views/ProfitLossSummary/ProfitLossSummaryView';

type Props = Pick<ViewProps, 'className'>;

export const DashboardProfitLossSummaryContainer: FC<Props> = ({ className }) => {
  const session = useSelector(selectSessionProfitLoss);
  const day = useSelector(selectDayProfitLoss);
  const week = useSelector(selectWeekProfitLoss);
  const month = useSelector(selectMonthProfitLoss);
  const year = useSelector(selectYearProfitLoss);
  const allTime = useSelector(selectAllTimeProfitLoss);

  useLoadProfitLossCommand();

  return (
    <ProfitLossSummaryView
      className={className}
      currentSession={session}
      currentDay={day}
      pastWeek={week}
      pastMonth={month}
      pastYear={year}
      allTime={allTime}
    />
  );
};
