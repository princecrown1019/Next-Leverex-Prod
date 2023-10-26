import React, { FC, FormEvent, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '~/store/types';
import { ProductSide } from '~/types/productTypes';
import { selectCreateOrderLoading } from '~/store/Orders/selectors';
import { selectMaxTradeAmount } from '~/store/TradeEstimations/selectors';
import { selectLoggedIn } from '~/store/Session/selectors';
import { selectMarketPriceExists, selectProduct } from '~/store/Market/selectors';
import { useMarketContext } from '~/modules/Trade/contexts/Market/MarketContext';
import { TradeInputComponent } from '~/modules/Trade/components/Input/InputComponent';
import { TradeSliderComponent } from '~/modules/Trade/components/Slider/SliderComponent';
import { useEstimateImCommand } from '~/modules/Trade/commands/EstimateIm/useEstimateImCommand';
import { useCreateOrderCommand } from '~/modules/Trade/commands/CreateOrder/usePlaceOrderCommand';
import { usePreselectedAmount } from '~/modules/Trade/hooks/PreselectedButtons/usePreselectedAmount';
import { useAmountInput } from '~/modules/Trade/hooks/AmountInput/useAmountInput';
import { MarketPreselectedAmountsComponent } from '~/modules/Trade/components/PreselectedButtons/PreselectedButtonsComponent';
import { MarketView, Props as ViewProps } from '~/modules/Trade/views/Market/MarketView';

type Props = Pick<ViewProps, 'className'>;

export const MarketContainer: FC<Props> = ({ className }) => {
  const { amount, side, controls: marketControls } = useMarketContext();

  const loggedIn = useSelector(selectLoggedIn);
  const { ticker } = useSelector(selectProduct);
  const maxTradeAmount = useSelector(selectMaxTradeAmount);
  const loading = useSelector(selectCreateOrderLoading);
  const marketPriceExists = useSelector((state: AppState) => selectMarketPriceExists(state, [side, amount.amount]));

  useEstimateImCommand(side, amount.amount, !loading);
  const createOrder = useCreateOrderCommand();

  const { inputDisabled, minAmountValue, maxAmountValue, ...amountInput } = useAmountInput();
  const preselectedAmount = usePreselectedAmount(inputDisabled, amountInput.focus);

  const inputError = useMemo(() => {
    if (!amount.value) return false;
    if (!loggedIn || (amount.value && !amount.amount)) return true;

    return Number(maxTradeAmount?.[side]) < amount.amount || !marketPriceExists || amount.amount < minAmountValue;
  }, [maxTradeAmount?.[side], amount.amount, amount.value, marketPriceExists]);

  const tradeDisabled = useMemo(() => {
    return inputDisabled || !amount.value || !amount.amount || inputError;
  }, [inputDisabled, amount.amount, amount.value, inputError]);

  const sliderMaxValue = useMemo(() => {
    return inputDisabled ? maxAmountValue : maxTradeAmount?.[side] || maxAmountValue;
  }, [inputDisabled, maxTradeAmount, side]);

  const handleSliderChange = useCallback(
    (sliderValue: number) => {
      if (inputDisabled || !maxTradeAmount?.[side]) return;

      marketControls.setAmount(sliderValue, sliderValue ? sliderValue.toString() : '');
    },
    [inputDisabled, maxTradeAmount?.[side]]
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (tradeDisabled) return;

      createOrder(side, amount.amount);
    },
    [tradeDisabled, createOrder, side, amount.amount]
  );

  return (
    <MarketView
      className={className}
      long={side === ProductSide.BUY}
      loading={loading}
      disabled={tradeDisabled}
      handleSubmit={handleSubmit}
    >
      <TradeInputComponent
        label="Amount"
        value={amount.value}
        disabled={inputDisabled}
        numericValue={loggedIn ? amount.amount : 0}
        ticker={ticker}
        fixed={8}
        handleFocus={amountInput.handleInputBlurAndFocus}
        handleBlur={amountInput.handleInputBlurAndFocus}
        error={inputError}
        ref={amountInput.ref}
        handleChange={amountInput.handleInputChange}
      />
      <MarketPreselectedAmountsComponent
        buttons={preselectedAmount.amounts}
        idx={preselectedAmount.preselectedIdx}
        getFlatIdx={preselectedAmount.getFlatIdx}
        handleClick={preselectedAmount.handlePreselectedButtonClick}
        handleGetFlatClick={preselectedAmount.handleGetFlatClick}
      />
      <TradeSliderComponent
        step={minAmountValue}
        value={amount.amount}
        max={sliderMaxValue}
        min={minAmountValue}
        handleMouseUp={amountInput.focus}
        handleChange={handleSliderChange}
      />
    </MarketView>
  );
};
