import React, { FC, useCallback, useMemo, useState } from 'react';

import { useSubscribeDealersOffersCommand } from '~/modules/Trade/commands/SubscribeDealersOffers/useLoadDealersOffersCommand';
import { useUnsubscribeDealersOffersCommand } from '~/modules/Trade/commands/UnsubscribeDealersOffers/useLoadDealersOffersCommand';
import { TradeView, Props as ViewProps } from '~/modules/Trade/views/Trade/TradeView';

type Props = Pick<ViewProps, 'className'>;

export const TradeContainer: FC<Props> = ({ className }) => {
  const [tabIdx, setTabIdx] = useState(0);

  useSubscribeDealersOffersCommand();
  useUnsubscribeDealersOffersCommand();

  const handleTabChange = useCallback((value: number) => {
    setTabIdx(value);
  }, []);

  return useMemo(() => <TradeView className={className} tabIdx={tabIdx} handleTabChange={handleTabChange} />, [tabIdx]);
};
