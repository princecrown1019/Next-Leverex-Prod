import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { MIN_TRADE_AMOUNT } from '~/constants/tradeConstants';
import { ProductSide } from '~/types/productTypes';
import { selectLoggedIn } from '~/store/Session/selectors';
import { selectBuyingPower } from '~/store/Balances/selectors';
import { selectCreateOrderLoading, selectNetExposure } from '~/store/Orders/selectors';
import { selectMaxTradeAmount, selectMaxTradeAmountError } from '~/store/TradeEstimations/selectors';
import { useMarketContext } from '~/modules/Trade/contexts/Market/MarketContext';

type Buttons = [number, number, number, number, number, string];

export const usePreselectedAmount = (inputDisabled: boolean, focusInputCallback: () => void) => {
  const { amount, side, controls: marketControls } = useMarketContext();

  const [preselectedIdx, setPreselectedIdx] = useState<null | number>(null);

  const loggedIn = useSelector(selectLoggedIn);
  const loading = useSelector(selectCreateOrderLoading);
  const buyingPower = useSelector(selectBuyingPower);
  const netExposure = useSelector(selectNetExposure);
  const maxTradeAmount = useSelector(selectMaxTradeAmount);
  const maxTradeAmountError = useSelector(selectMaxTradeAmountError);

  const amounts = useMemo(() => {
    const buttons = ['Get flat'] as (string | number)[];

    if (buyingPower >= 2000 || !buyingPower) {
      buttons.unshift(0.05, 0.1, 0.25, 0.5, 1);
    } else if (buyingPower <= 500) {
      buttons.unshift(0.0005, 0.001, 0.002, 0.005, 0.01);
    } else if (buyingPower < 2000) {
      buttons.unshift(0.001, 0.002, 0.005, 0.01, 0.025);
    }

    return buttons as Buttons;
  }, [buyingPower]);

  const getFlatIdx = useMemo(() => amounts.length - 1, [amounts.length]);

  useEffect(() => {
    if (typeof preselectedIdx !== 'number') return;

    const preselectedValue = preselectedIdx === getFlatIdx ? Math.abs(netExposure) : amounts[preselectedIdx];
    if (amount.amount === preselectedValue) return;

    setPreselectedIdx(null);
  }, [amount.amount, amounts]);

  useEffect(() => {
    if (!amount.amount || !maxTradeAmount || loading) return;

    console.log({ maxTrade: Number(maxTradeAmount[side]) });

    if (maxTradeAmountError?.[side] || Number(maxTradeAmount[side]) < MIN_TRADE_AMOUNT) {
      marketControls.resetAmount();
    }
  }, [maxTradeAmountError?.[side], loading, maxTradeAmount?.[side]]);

  useEffect(() => {
    if (loggedIn) {
      if (loading) return;

      focusInputCallback();

      if (preselectedIdx === getFlatIdx) {
        setPreselectedIdx(null);
        marketControls.resetAmount();
      }
    } else {
      marketControls.resetAmount();
      setPreselectedIdx(null);
    }
  }, [loading, loggedIn]);

  const handlePreselectedButtonClick = useCallback(
    ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      if (inputDisabled) return;

      const value = currentTarget.name;
      const numericValue = Number(value);
      const idx = amounts.indexOf(numericValue);

      if (preselectedIdx === idx) {
        marketControls.resetAmount();
        setPreselectedIdx(null);
      } else {
        marketControls.setAmount(numericValue, value);
        setPreselectedIdx(idx);
      }

      focusInputCallback();
    },
    [inputDisabled, preselectedIdx, amounts]
  );

  const handleGetFlatClick = useCallback(() => {
    if (inputDisabled || !netExposure) return;

    if (preselectedIdx === getFlatIdx) {
      marketControls.resetAmount();
      setPreselectedIdx(null);
    } else {
      const newSide = netExposure < 0 ? ProductSide.BUY : ProductSide.SELL;
      const newAmount = Math.abs(netExposure);

      marketControls.setSide(newSide);
      marketControls.setAmount(newAmount, newAmount ? newAmount.toString() : '');
      setPreselectedIdx(getFlatIdx);
    }

    focusInputCallback();
  }, [inputDisabled, preselectedIdx, maxTradeAmount, netExposure, side]);

  return {
    getFlatIdx,
    amounts,
    preselectedIdx,
    setPreselectedIdx,
    handleGetFlatClick,
    handlePreselectedButtonClick
  };
};
