import { Currency, Ticker } from '~/types/currencyTypes';
import { AccountSummaryStatement, PositionsSummaryStatement } from '~/types/statemetsTypes';
import { separateAndFix } from '~/services/NumberFormat/numberFormatService';

export const serializeAccountSummaryStatementPDF = (summary: AccountSummaryStatement) => {
  const head = ['Name', Currency.USDT];

  const body = [
    ['Opening balance', separateAndFix(summary.openingBalance)],
    ['Withdrawals', separateAndFix(summary.withdrawals)],
    ['Deposits', separateAndFix(summary.deposits)],
    ['Fees', separateAndFix(summary.fees)],
    ['Profit/Loss', separateAndFix(summary.pnl)],
    ['Net balance change', separateAndFix(summary.netBalanceChange)],
    ['Closing balance', separateAndFix(summary.closingBalance)]
  ];

  return { head, body };
};

export const serializePositionsSummaryStatementPDF = (summary: PositionsSummaryStatement) => {
  const head = ['Name', Ticker.BTC];

  const body = [
    ['Opening exposure', separateAndFix(summary.openingExposure, 8)],
    ['Gross volume', separateAndFix(summary.volume, 8)],
    ['Net exposure change', separateAndFix(summary.netExposureChange, 8)],
    ['Closing exposure', separateAndFix(summary.closingExposure, 8)]
  ];

  return { head, body };
};
