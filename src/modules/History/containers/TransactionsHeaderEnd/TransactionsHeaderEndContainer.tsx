import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '~/store/types';
import { selectLiquidTransactionsFiltered } from '~/store/LiquidTransactions/selectors';
import { serializeTransactionsCSV } from '~/store/LiquidTransactions/serializer';
import { useTransactionsContext } from '~/modules/History/contexts/Transactions/TransactionsContext';
import { useDownloadCsv } from '~/hooks/DownloadCsv/useDownloadCsv';
import { FilterComponent } from '~/modules/History/components/Filter/FilterComponent';
import {
  TransactionsHeaderEndView,
  Props as ViewProps
} from '~/modules/History/views/TransactionsHeaderEnd/TransactionsHeaderEndView';

type Props = Pick<ViewProps, 'className'>;

export const TransactionsHeaderEndContainer: FC<Props> = ({ className }) => {
  const { filterState, handleFilterChange } = useTransactionsContext();

  const transactions = useSelector((state: AppState) => selectLiquidTransactionsFiltered(state, filterState));

  const csvManager = useDownloadCsv();

  const handleDownloadClick = useCallback(() => {
    csvManager.download(serializeTransactionsCSV(transactions));
  }, [transactions, csvManager.download]);

  return (
    <TransactionsHeaderEndView className={className} anchorRef={csvManager.anchorRef} handeClick={handleDownloadClick}>
      <FilterComponent state={filterState} handleChange={handleFilterChange} />
    </TransactionsHeaderEndView>
  );
};
