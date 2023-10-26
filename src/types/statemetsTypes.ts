export enum StatementFormat {
  PDF = 'PDF',
  CSV = 'CSV'
}

export enum StatementRange {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  LAST_7_DAYS = 'last7Days',
  THIS_MONTH = 'thisMonth',
  THIS_YEAR = 'thisYear',
  CUSTOM = 'custom'
}

export type AccountSummaryStatement = {
  openingBalance: number;
  closingBalance: number;
  netBalanceChange: number;
  deposits: number;
  withdrawals: number;
  fees: number;
  pnl: number;
};

export type PositionsSummaryStatement = {
  openingExposure: number;
  closingExposure: number;
  netExposureChange: number;
  volume: number;
};
