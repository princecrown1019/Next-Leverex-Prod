import React, { FC, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '~/store/types';
import {
  selectCurrentProductBuyWorkingOrdersGroupedByPrice,
  selectCurrentProductSellWorkingOrdersGroupedByPrice
} from '~/store/Orders/selectors';
import { selectLoggedIn } from '~/store/Session/selectors';
import {
  selectBestBuyDealerOfferGroupedByPrice,
  selectBestSellDealerOfferGroupedByPrice,
  selectProduct
} from '~/store/Market/selectors';
import { useMarketContext } from '~/modules/Trade/contexts/Market/MarketContext';
import { TradeInputComponent } from '~/modules/Trade/components/Input/InputComponent';
import { usePreselectedAmount } from '~/modules/Trade/hooks/PreselectedButtons/usePreselectedAmount';
import { MarketPreselectedAmountsComponent } from '~/modules/Trade/components/PreselectedButtons/PreselectedButtonsComponent';
import { Ladder } from '~/modules/Trade/components/Ladder/Ladder';
import { useCreateWorkingOrderCommand } from '~/modules/Trade/commands/CreateWorkingOrder/useCreateWorkingOrderCommand';
import { useCancelWorkingOrdersCommand } from '~/modules/Trade/commands/CancelWorkingOrders/useCancelWorkingOrdersCommand';
import { useUpdateWorkingOrderCommand } from '~/modules/Trade/commands/UpdateWorkingOrder/useUpdateWorkingOrderCommand';
import { useLadderDragAndDrop } from '~/modules/Trade/hooks/LadderDragAndDrop/useLadderDragAndDrop';
import { useAmountInput } from '~/modules/Trade/hooks/AmountInput/useAmountInput';
import { LadderView, Props as ViewProps } from '~/modules/Trade/views/Ladder/LadderView';
import { selectMaxTradeAmount } from '~/store/TradeEstimations/selectors';
import { ProductSide } from '~/types/productTypes';
import { useLadderAlignment } from '~/modules/Trade/hooks/LadderAlignment/useLadderAlignment';

type Props = Pick<ViewProps, 'className'>;

const SPREAD = 25;

export const LadderContainer: FC<Props> = ({ className }) => {
  const { amount } = useMarketContext();

  const offerAmount = amount.amount || 0.0001;

  const loggedIn = useSelector(selectLoggedIn);
  const { ticker } = useSelector(selectProduct);
  const maxTradeAmount = useSelector(selectMaxTradeAmount);
  const ordersBid = useSelector(selectCurrentProductBuyWorkingOrdersGroupedByPrice);
  const ordersAsk = useSelector(selectCurrentProductSellWorkingOrdersGroupedByPrice);
  const offerAsk = useSelector((state: AppState) => selectBestSellDealerOfferGroupedByPrice(state, offerAmount));
  const offerBid = useSelector((state: AppState) => selectBestBuyDealerOfferGroupedByPrice(state, offerAmount));

  const dragAndDropHandlers = useLadderDragAndDrop();
  const { midPrice, align, ladderContainerRef } = useLadderAlignment(SPREAD);
  const { inputDisabled, inputError, ...amountInput } = useAmountInput();

  const createOrder = useCreateWorkingOrderCommand();
  const cancelOrders = useCancelWorkingOrdersCommand();
  const updateOrder = useUpdateWorkingOrderCommand();

  const submitDisabled = useMemo(() => {
    return inputDisabled || !amount.amount;
  }, [inputDisabled, amount.amount]);

  const minMaxAmount = useMemo(() => {
    return Math.min(Number(maxTradeAmount?.[ProductSide.SELL]), Number(maxTradeAmount?.[ProductSide.BUY]));
  }, [maxTradeAmount]);

  const error = useMemo(() => {
    return inputError || minMaxAmount < amount.amount;
  }, [minMaxAmount, amount.amount, inputError]);

  const preselectedAmount = usePreselectedAmount(inputDisabled, amountInput.focus);

  const handleRowSideClick = useCallback(
    ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
      if (inputDisabled || error) return;

      const side = Number(currentTarget.dataset.side);
      const price = Number(currentTarget.dataset.price);
      if (!side || !price) return;

      createOrder(side, amount.amount, price);
    },
    [inputDisabled, amount.amount, createOrder, updateOrder]
  );

  const handleRowQtyClick = useCallback(
    ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
      if (inputDisabled) return;

      const side = currentTarget.dataset.side;
      const price = currentTarget.dataset.price;
      if (!side || !price) return;

      cancelOrders(Number(side), Number(price));
    },
    [inputDisabled, cancelOrders]
  );

  return (
    <LadderView className={className}>
      <Ladder
        containerRef={ladderContainerRef}
        ordersAsk={loggedIn ? ordersAsk : []}
        ordersBid={loggedIn ? ordersBid : []}
        offerAsk={offerAsk}
        offerBid={offerBid}
        spread={SPREAD}
        price={midPrice}
        disabled={submitDisabled}
        handleRowSideClick={handleRowSideClick}
        handleRowQtyClick={handleRowQtyClick}
        handleRowPriceClick={align}
        handleDragStart={dragAndDropHandlers.handleDragStart}
        handleDragOver={dragAndDropHandlers.handleDragOver}
        handleDrop={dragAndDropHandlers.handleDrop}
      />

      <TradeInputComponent
        label="Amount"
        value={amount.value}
        disabled={inputDisabled}
        numericValue={loggedIn ? amount.amount : 0}
        ticker={ticker}
        fixed={8}
        error={error}
        ref={amountInput.ref}
        handleFocus={amountInput.handleInputBlurAndFocus}
        handleChange={amountInput.handleInputChange}
      />
      <MarketPreselectedAmountsComponent
        buttons={preselectedAmount.amounts}
        idx={preselectedAmount.preselectedIdx}
        getFlatIdx={preselectedAmount.getFlatIdx}
        handleClick={preselectedAmount.handlePreselectedButtonClick}
        handleGetFlatClick={preselectedAmount.handleGetFlatClick}
      />
    </LadderView>
  );
};
