import React, { FC, useCallback, useMemo, useState } from 'react';

import { TradesContainer } from '~/modules/History/containers/Trades/TradesContainer';
import { TransactionsContainer } from '~/modules/History/containers/Transactions/TransactionsContainer';
import { TransactionsHeaderEndContainer } from '~/modules/History/containers/TransactionsHeaderEnd/TransactionsHeaderEndContainer';
import { TradesHeaderEndContainer } from '~/modules/History/containers/TradesHeaderEnd/TradesHeaderEndContainer';
import { TradesContextProvider } from '~/modules/History/contexts/Trades/TradesContext';
import { TransactionsContextProvider } from '~/modules/History/contexts/Transactions/TransactionsContext';
import { HistoryView, Props as ViewProps } from '~/modules/History/views/History/HistoryView';

type Props = Pick<ViewProps, 'className'>;

export const HistoryContainer: FC<Props> = ({ className }) => {
  const [tabIdx, setTabIdx] = useState(0);

  const handleTabChange = useCallback((idx: number) => {
    setTabIdx(idx);
  }, []);

  const headerEnd = useMemo(
    () => (tabIdx ? <TransactionsHeaderEndContainer /> : <TradesHeaderEndContainer />),
    [tabIdx]
  );

  return (
    <TradesContextProvider>
      <TransactionsContextProvider>
        <HistoryView className={className} tabIdx={tabIdx} headerEnd={headerEnd} handleTebChange={handleTabChange}>
          <TradesContainer />
          <TransactionsContainer />
        </HistoryView>
      </TransactionsContextProvider>
    </TradesContextProvider>
  );
};
