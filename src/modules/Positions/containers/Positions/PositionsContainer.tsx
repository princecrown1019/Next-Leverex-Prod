import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentProductWorkingOrdersQuantity, selectSessionOrdersQuantity } from '~/store/Orders/selectors';
import { selectLoggedIn } from '~/store/Session/selectors';
import { useLoadSessionOrdersCommand } from '~/modules/Positions/commands/LoadSessionOrders/useSessionOrdersCommand';
import { PositionsView, Props as ViewProps } from '~/modules/Positions/views/Positions/PositionsView';
import { OpenPositionsContainer } from '~/modules/Positions/containers/OpenPositions/OpenPositionsContainer';
import { WorkingPositionsContainer } from '~/modules/Positions/containers/WorkingPositions/WorkingPositionsContainer';

type Props = Pick<ViewProps, 'className' | 'rounded'>;

const tabs = [<OpenPositionsContainer key={1} />, <WorkingPositionsContainer key={2} />];

export const PositionsContainer = memo<Props>(({ className, rounded }) => {
  const [tabIdx, setTabIdx] = useState(0);

  const loggedIn = useSelector(selectLoggedIn);
  const workingQuantity = useSelector(selectCurrentProductWorkingOrdersQuantity);
  const openQuantity = useSelector(selectSessionOrdersQuantity);

  useLoadSessionOrdersCommand(loggedIn, !!openQuantity);

  const handleTabChange = useCallback((value: number) => {
    setTabIdx(value);
  }, []);

  return (
    <PositionsView
      className={className}
      rounded={rounded}
      tabIdx={tabIdx}
      workingQuantity={workingQuantity}
      openQuantity={openQuantity}
      loggedIn={loggedIn}
      handleTabChange={handleTabChange}
    >
      {tabs[tabIdx]}
    </PositionsView>
  );
});
