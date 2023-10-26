import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { MAX_TRADE_AMOUNT, MIN_TRADE_AMOUNT } from '~/constants/tradeConstants';
import { selectLoggedIn } from '~/store/Session/selectors';
import { selectCreateOrderLoading } from '~/store/Orders/selectors';
import { replaceAmount } from '~/services/InputFormat/inputFormatService';
import { toNumber } from '~/services/NumberFormat/numberFormatService';
import { useMarketContext } from '~/modules/Trade/contexts/Market/MarketContext';
import { useMaxTradeAmountCommand } from '~/modules/Trade/commands/MaxTradeAmount/useMaxTradeAmountCommand';
import { useInputFocus } from '~/hooks/InputFocus/useDebounce';

const amountRegExp = new RegExp(/^(\d{0,2})(|(\.(\d{0,8})))$/);

export const useAmountInput = () => {
  const { amount, side, controls: marketControls } = useMarketContext();

  const amountInput = useInputFocus();

  const loggedIn = useSelector(selectLoggedIn);
  const loading = useSelector(selectCreateOrderLoading);

  const loadMaxTradeAmount = useMaxTradeAmountCommand();

  useEffect(amountInput.focus, [side]);

  const inputDisabled = useMemo(() => {
    return loading;
  }, [loading]);

  const inputError = useMemo(() => {
    if (!amount.amount) return false;

    return amount.amount < MIN_TRADE_AMOUNT || amount.amount > MAX_TRADE_AMOUNT;
  }, [amount.amount]);

  const handleInputChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      if (inputDisabled || !amountRegExp.test(currentTarget.value)) return;

      const newValue = replaceAmount(currentTarget.value, 8);
      const numericNewValue = toNumber(newValue);

      marketControls.setAmount(numericNewValue, newValue);
    },
    [inputDisabled]
  );

  const handleInputBlurAndFocus = useCallback(() => {
    if (loggedIn !== null && loggedIn) loadMaxTradeAmount();
  }, []);

  return {
    inputDisabled,
    inputError,
    handleInputChange,
    handleInputBlurAndFocus,
    minAmountValue: MIN_TRADE_AMOUNT,
    maxAmountValue: MAX_TRADE_AMOUNT,
    ...amountInput
  };
};
