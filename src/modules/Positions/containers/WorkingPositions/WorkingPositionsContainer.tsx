import React, { memo, useCallback, useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentProductWorkingNetExposure, selectCurrentProductWorkingOrders } from '~/store/Orders/selectors';
import { selectLoggedIn } from '~/store/Session/selectors';
import { selectProduct } from '~/store/Market/selectors';
import { PositionsWorkingAccordionHeaderComponent } from '~/modules/Positions/components/WorkingAccordionHeader/WorkingHeaderComponent';
import { PositionsWorkingAccordionComponent } from '~/modules/Positions/components/WorkingAccordion/WorkingAccordionComponent';
import { WorkingPositionsView } from '~/modules/Positions/views/WorkingPositions/WorkingPositionsView';
import { useCancelWorkingOrderCommand } from '~/modules/Positions/commands/CancelWorkingOrder/useCancelWorkingOrdersCommand';

export const WorkingPositionsContainer = memo(() => {
  const [visible, setVisible] = useState(true);

  const loggedIn = useSelector(selectLoggedIn);
  const product = useSelector(selectProduct);
  const orders = useSelector(selectCurrentProductWorkingOrders);
  const netExposure = useSelector(selectCurrentProductWorkingNetExposure);

  const cancelOrder = useCancelWorkingOrderCommand();

  const handleAccordionToggle = useCallback(() => {
    setVisible((prevVisible) => !prevVisible);
  }, []);

  const handleCancelClick = useCallback(({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    cancelOrder(currentTarget.name);
  }, []);

  return (
    <WorkingPositionsView
      loading={false}
      empty={!orders.length}
      loggedIn={loggedIn}
      currency={product.currency}
      ticker={product.ticker}
    >
      <PositionsWorkingAccordionComponent
        visible={visible}
        orders={orders}
        product={product}
        handleAccordionToggle={handleAccordionToggle}
        handleCancelClick={handleCancelClick}
      >
        <PositionsWorkingAccordionHeaderComponent visible={visible} product={product} netExposure={netExposure} />
      </PositionsWorkingAccordionComponent>
    </WorkingPositionsView>
  );
});
