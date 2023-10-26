import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentSessionHealth, selectProduct } from '~/store/Market/selectors';
import { SessionHealthView } from '~/modules/Trade/views/SessionHealth/SessionHealthView';

export type Props = {
  className?: string;
};

export const SessionHealthContainer: FC<Props> = ({ className }) => {
  const status = useSelector(selectCurrentSessionHealth);
  const { ticker, currency } = useSelector(selectProduct);

  return <SessionHealthView className={className} status={status} currency={currency} ticker={ticker} />;
};
