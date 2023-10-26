import { StatementRange } from '~/types/statemetsTypes';

export const STATEMENT_PRESELECTED_RANGE = {
  [StatementRange.TODAY]: 'Today',
  [StatementRange.YESTERDAY]: 'Yesterday',
  [StatementRange.LAST_7_DAYS]: 'Last 7 days',
  [StatementRange.THIS_MONTH]: 'This month',
  [StatementRange.THIS_YEAR]: 'This year',
  [StatementRange.CUSTOM]: 'Custom'
};
