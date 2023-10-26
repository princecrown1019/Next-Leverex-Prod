import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  selectNetExposure,
  selectSessionOrdersLoading,
  selectSessionOrdersWithDefaultsAndPNL
} from '~/store/Orders/selectors';
import { selectLoggedIn, selectLoggedInUI } from '~/store/Session/selectors';
import { selectProduct } from '~/store/Market/selectors';
import { selectSessionProfitLoss } from '~/store/ProfitsLosses/selectors';
import { useLoadSessionOrdersCommand } from '~/modules/Positions/commands/LoadSessionOrders/useSessionOrdersCommand';
import { OpenPositionsView } from '~/modules/Positions/views/OpenPositions/OpenPositionsView';
import { PositionsSessionAccordionComponent } from '~/modules/Positions/components/SessionAccordion/SessionAccordionComponent';
import { PositionsSessionAccordionHeaderComponent } from '~/modules/Positions/components/SessionAccordionHeader/AccordionHeaderComponent';

export const OpenPositionsContainer = memo(() => {
  const [visible, setVisible] = useState(true);

  const loggedIn = useSelector(selectLoggedIn);
  const loggedInUI = useSelector(selectLoggedInUI);
  const loading = useSelector(selectSessionOrdersLoading);
  const product = useSelector(selectProduct);
  const orders = useSelector(selectSessionOrdersWithDefaultsAndPNL);
  const profitLoss = useSelector(selectSessionProfitLoss);
  const netExposure = useSelector(selectNetExposure);

  useLoadSessionOrdersCommand(loggedIn, !!orders.length);

  const handleAccordionToggle = useCallback(() => {
    setVisible((prevVisible) => !prevVisible);
  }, []);

  return (
    <OpenPositionsView
      loading={loggedInUI && loading}
      empty={!orders.length}
      currency={product.currency}
      ticker={product.ticker}
      loggedIn={loggedIn}
    >
      <PositionsSessionAccordionComponent
        visible={visible}
        orders={orders}
        product={product}
        handleAccordionToggle={handleAccordionToggle}
      >
        <PositionsSessionAccordionHeaderComponent
          visible={visible}
          product={product}
          netExposure={netExposure}
          profitLoss={profitLoss}
        />
      </PositionsSessionAccordionComponent>
    </OpenPositionsView>
  );
});
