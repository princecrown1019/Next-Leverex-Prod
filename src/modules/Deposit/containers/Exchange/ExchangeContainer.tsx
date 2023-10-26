import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectDepositAddress } from '~/store/Deposits/selectors';
import { useSideShift } from '~/hooks/SideShift/useSideShift';
import { ExchangeView, Props as ViewProps } from '~/modules/Deposit/views/Exchange/ExchangeView';

type Props = Pick<ViewProps, 'className'>;

export const ExchangeContainer: FC<Props> = ({ className }) => {
  const depositAddress = useSelector(selectDepositAddress);

  const { showWidget, SideShiftScript, ready } = useSideShift(depositAddress);

  return (
    <>
      <ExchangeView className={className} loading={!ready} handleClick={showWidget} />
      <SideShiftScript />
    </>
  );
};
