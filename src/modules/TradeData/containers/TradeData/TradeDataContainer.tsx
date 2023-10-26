import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectLoggedInUI } from '~/store/Session/selectors';
import { TradeDataView, Props as ViewProps } from '~/modules/TradeData/views/TradeDataView/TradeDataView';

type Props = Pick<ViewProps, 'className'>;

export const TradeDataContainer = memo<Props>(({ className }) => {
  const loggedInUI = useSelector(selectLoggedInUI);

  return <TradeDataView className={className} loggedIn={loggedInUI} />;
});
