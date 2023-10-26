import React, { FC, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { ENV, PROD_ENV } from '~/constants/configConstants';
import { StatementFormat, StatementRange } from '~/types/statemetsTypes';
import { toSlashSeparatedDate, toSlashSeparatedFullDate, toUTCTime } from '~/services/DateFormat/dateFormatService';
import { selectLiquidTransactionsForDownload } from '~/store/LiquidTransactions/selectors';
import { selectAccountCreatedDate } from '~/store/Session/selectors';
import { selectTradesHistoryForDownload } from '~/store/TradesHistory/selectors';
import {
  selectAccountSummaryStatement,
  selectPositionsSummaryStatement,
  selectStatementLoading
} from '~/store/Statements/selectors';
import {
  serializeAccountSummaryStatementPDF,
  serializePositionsSummaryStatementPDF
} from '~/store/Statements/serializer';
import { serializeTransactionsPDF } from '~/store/LiquidTransactions/serializer';
import { serializeOrdersPDF } from '~/store/TradesHistory/serializer';
import { useInputFocus } from '~/hooks/InputFocus/useDebounce';
import { useOutsideClickMultiple } from '~/hooks/OutsideClick/useOutsideClick';
import { usePdfDocument } from '~/hooks/PdfDocument/usePdfDocument';
import { DateRangePickerComponent } from '~/components/DateRangePicker/DateRangePickerComponent';
import { useLoadOrdersHistoryCommand } from '~/modules/Statements/commands/LoadOrdersHistory/useLoadOrdersHistoryCommand';
import { useLoadWithdrawalsCommand } from '~/modules/Statements/commands/LoadWithdrawals/useLoadWithdrawalsCommand';
import { useLoadDepositsCommand } from '~/modules/Statements/commands/LoadDeposits/useLoadDepositsCommand';
import { useResetOrdersHistoryCommand } from '~/modules/Statements/commands/ResetOrdersHistory/useResetOrdersHistoryCommand';
import { useResetWithdrawalsDownloadCommand } from '~/modules/Statements/commands/ResetWithdrawalsDownload/useResetWithdrawalsDownloadCommand';
import { useResetDepositsDownloadCommand } from '~/modules/Statements/commands/ResetDepositsDownload/useResetDepositsDownloadCommand';
import { useStatementTimeRange } from '~/modules/Statements/hooks/TimeRange/useTimeRange';
import { Props as ViewProps, StatementsView } from '~/modules/Statements/views/Statements/StatementsView';
import { useLoadBalancesHistoryCommand } from '~/modules/Statements/commands/LoadBalancesHistory/useLoadOrdersHistoryCommand';

type Props = Pick<ViewProps, 'className'>;

const formatOptions = Object.values(StatementFormat);

export const StatementsContainer: FC<Props> = ({ className }) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  const [range, setRange] = useState<null | StatementRange>(null);
  const [format, setFormat] = useState<null | StatementFormat>(StatementFormat.PDF);
  const [selectorVisible, setSelectorVisible] = useState(false);

  const orders = useSelector(selectTradesHistoryForDownload);
  const transactions = useSelector(selectLiquidTransactionsForDownload);
  const loading = useSelector(selectStatementLoading);
  const accountSummary = useSelector(selectAccountSummaryStatement);
  const positionsSummary = useSelector(selectPositionsSummaryStatement);
  const accountCreatedDate = useSelector(selectAccountCreatedDate);

  const dateRangeInput = useInputFocus();
  const pdfDocument = usePdfDocument(25);
  const { startDate, endDate, dateRange, ...timeRangesControls } = useStatementTimeRange(accountCreatedDate);
  const loadHistory = useLoadOrdersHistoryCommand();
  const resetOrdersHistory = useResetOrdersHistoryCommand();
  const loadWithdrawals = useLoadWithdrawalsCommand();
  const resetWithdrawalsDownload = useResetWithdrawalsDownloadCommand();
  const loadDeposits = useLoadDepositsCommand();
  const loadBalances = useLoadBalancesHistoryCommand();
  const resetDepositsDownload = useResetDepositsDownloadCommand();

  useOutsideClickMultiple([pickerRef, dateRangeInput.ref], () => {
    setSelectorVisible(false);
  });

  useEffect(() => {
    setRange(StatementRange.LAST_7_DAYS);
  }, []);

  useEffect(() => {
    if (!range) return;

    timeRangesControls.setTimeRange(range);
  }, [range]);

  const downloadFileName = useMemo(() => {
    if (!format) return null;

    const env = PROD_ENV ? '' : `-${ENV}`;

    return `leverex${env}-${dateRange?.replace(' - ', '_') || 'all-time'}-statement.${format.toLowerCase()}`;
  }, [format, dateRange]);

  const headline = useMemo(() => {
    if (!startDate || !endDate) return '';

    return `Client account statement as of\n${toSlashSeparatedDate(startDate)} - ${toSlashSeparatedDate(endDate)}`;
  }, [startDate, endDate]);

  useEffect(() => {
    if (loading || !startDate) return;

    pdfDocument.initDocument();

    pdfDocument.addImage('/static/media/brand-dark.png', 225, 50, 145, 30, () => {
      pdfDocument.addCenteredHeadline(headline, 180);

      const downloadDate = new Date();
      pdfDocument.addCenteredSecondaryText(toSlashSeparatedFullDate(downloadDate), 225);

      const account = serializeAccountSummaryStatementPDF(accountSummary);
      pdfDocument.addTableWithHeadline('Client account summary', account.head, account.body, 280);

      const positions = serializePositionsSummaryStatementPDF(positionsSummary);
      pdfDocument.addTableWithHeadline('Client positions summary', positions.head, positions.body);

      const clientOrders = serializeOrdersPDF(orders);
      pdfDocument.addTableWithHeadline('Client orders', clientOrders.head, clientOrders.body, 0, (row) => {
        return Boolean(row[row.length - 1]);
      });

      const clientTransfers = serializeTransactionsPDF(transactions);
      pdfDocument.addTableWithHeadline('Client transfers', clientTransfers.head, clientTransfers.body);

      pdfDocument.download(downloadFileName);
      resetOrdersHistory();
      resetWithdrawalsDownload();
      resetDepositsDownload();
    });
  }, [loading]);

  const disabled = useMemo(() => !startDate || !endDate, [startDate, endDate]);

  const handleFormatChange = useCallback((value: StatementFormat) => {
    setFormat(value);
  }, []);

  const handleRangeDropdownChange = useCallback((value: StatementRange) => {
    if (value === StatementRange.CUSTOM) {
      setSelectorVisible(true);
    }

    setRange(value);
  }, []);

  const handleSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      if (disabled || !range) return;
      const [start, end] = timeRangesControls.getTimeRange(range);
      if (!start || !end) return;

      const startTime = toUTCTime(start);
      const endTime = toUTCTime(end);

      console.log({ here: true });

      loadBalances(startTime, endTime);
      loadHistory(startTime, endTime);
      loadWithdrawals(startTime, endTime);
      loadDeposits(startTime, endTime);
    },
    [disabled, format, range]
  );

  return (
    <StatementsView
      className={className}
      disabled={disabled}
      loading={loading}
      selectorVisible={selectorVisible}
      pickerRef={pickerRef}
      format={format}
      formatOptions={formatOptions}
      dateRange={dateRange}
      rangeValue={range}
      handleRangeDropdownChange={handleRangeDropdownChange}
      handleFormatChange={handleFormatChange}
      handleSubmit={handleSubmit}
    >
      <DateRangePickerComponent
        startDate={startDate}
        endDate={endDate}
        minDate={accountCreatedDate}
        handleStartChange={timeRangesControls.setStartDate}
        handleEndChange={timeRangesControls.setEndDate}
      />
    </StatementsView>
  );
};
