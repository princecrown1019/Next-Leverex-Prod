import React, { FC, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '~/store/types';
import { selectCsvTradesHistoryFiltered, selectCsvTradesHistoryLoading } from '~/store/TradesHistory/selectors';
import { serializeOrdersCSV } from '~/store/TradesHistory/serializer';
import { useLoadCsvOrdersHistoryCommand } from '~/modules/History/commands/LoadCsvOrdersHistory/useLoadCsvOrdersHistoryCommand';
import { useResetCsvOrdersHistoryCommand } from '~/modules/History/commands/ResetCsvOrdersHistory/useResetCsvOrdersHistoryCommand';
import { FilterComponent } from '~/modules/History/components/Filter/FilterComponent';
import { useDownloadCsv } from '~/hooks/DownloadCsv/useDownloadCsv';
import { useTradesContext } from '~/modules/History/contexts/Trades/TradesContext';
import { TradesHeaderEndView, Props as ViewProps } from '~/modules/History/views/TradesHeaderEnd/TradesHeaderEndView';

type Props = Pick<ViewProps, 'className'>;

export const TradesHeaderEndContainer: FC<Props> = ({ className }) => {
  const { filterState, handleFilterChange } = useTradesContext();

  const loadingCsv = useSelector(selectCsvTradesHistoryLoading);
  const csvOrders = useSelector((state: AppState) => selectCsvTradesHistoryFiltered(state, filterState));

  const loadCsvOrders = useLoadCsvOrdersHistoryCommand();
  const resetCsvOrders = useResetCsvOrdersHistoryCommand();

  const csvManager = useDownloadCsv();

  const handleDownloadClick = useCallback(() => {
    if (loadingCsv) return;

    loadCsvOrders();
  }, [loadCsvOrders]);

  useEffect(() => {
    if (loadingCsv || !csvOrders.length) return;

    csvManager.download(serializeOrdersCSV(csvOrders), resetCsvOrders);
  }, [loadingCsv, csvManager.download]);

  return (
    <TradesHeaderEndView
      className={className}
      anchorRef={csvManager.anchorRef}
      handeClick={handleDownloadClick}
      loadingCsv={loadingCsv}
    >
      <FilterComponent state={filterState} handleChange={handleFilterChange} />
    </TradesHeaderEndView>
  );
};
