import { Withdrawal } from '~/types/withdrawalsTypes';
import { Deposit } from '~/types/depositsTypes';
import { LiquidTransaction } from '~/types/liquidTransactionTypes';
import { TransactionType } from '~/types/transactionTypes';
import { toUTCStringDate, toUTCStringTime } from '~/services/DateFormat/dateFormatService';
import { fixDecimals } from '~/services/NumberFormat/numberFormatService';
import { prepareForCsv } from '~/services/Csv/csvService';
import { truncateText } from '~/services/TextFormat/textFormatService';

export const serializeWithdrawalsAndDeposits = (deposits: Deposit<number>[], withdrawals: Withdrawal<number>[]) => {
  return [...deposits, ...withdrawals].sort((prev, curr) => curr.timestamp - prev.timestamp);
};

export const serializeTransactionsCSV = (transactions: LiquidTransaction<number>[]) => {
  const header = ['Date', 'Time', 'Network', 'Address', 'Currency', 'Amount', 'Unblinded link', 'Status'];

  const body = transactions.map((transaction) => [
    `${toUTCStringDate(transaction.timestamp)}`,
    `${toUTCStringTime(transaction.timestamp)}`,
    'Liquid Network',
    transaction.recvAddress,
    transaction.currency,
    `${transaction.type === TransactionType.DEPOSIT ? '+' : ''}${fixDecimals(transaction.amount, 2)}`,
    `${transaction.unblindedLink}`,
    `${transaction.nbConf >= 2 ? 'Completed' : `Confirming (${transaction.nbConf}/2)`}`
  ]);

  return prepareForCsv(header, body);
};

export const serializeTransactionsPDF = (transactions: LiquidTransaction<number>[]) => {
  const head = ['Date (UTC)', 'Network', 'Currency', 'Amount', 'Address', 'Status'];

  const body = transactions.length
    ? transactions.map((transaction) => [
        `${toUTCStringDate(transaction.timestamp)} ${toUTCStringTime(transaction.timestamp)}`,
        'Liquid Network',
        transaction.currency,
        `${transaction.type === TransactionType.DEPOSIT ? '+' : ''}${fixDecimals(transaction.amount, 2)}`,
        truncateText(transaction.recvAddress, 6, 6),
        `${transaction.nbConf >= 2 ? 'Completed' : `Confirming (${transaction.nbConf}/2)`}`
      ])
    : [['No transfers were made']];

  return { head, body };
};
