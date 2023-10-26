import React, { createContext, FC, PropsWithChildren, ReactNode, useCallback, useContext, useState } from 'react';

import { ProductSide } from '~/types/productTypes';

type Amount = {
  amount: number;
  value: string;
};

type Context = {
  side: ProductSide;
  amount: Amount;
  controls: {
    setAmount: (amount: number, value: string) => void;
    resetAmount: () => void;
    setSide: (side: ProductSide) => void;
    setLong: () => void;
    setShort: () => void;
  };
};

const initialAmountState = {
  amount: 0,
  value: ''
};

const MarketContext = createContext<null | Context>(null);

export const MarketProvider: FC<PropsWithChildren<ReactNode | ReactNode[]>> = ({ children }) => {
  const [side, setSide] = useState(ProductSide.BUY);
  const [amountValue, setAmountValue] = useState<Amount>(initialAmountState);

  const setLong = useCallback(() => {
    setSide(ProductSide.BUY);
  }, []);

  const setShort = useCallback(() => {
    setSide(ProductSide.SELL);
  }, []);

  const setAmount = useCallback((amount: number, value: string) => {
    setAmountValue({ amount, value });
  }, []);

  const resetAmount = useCallback(() => {
    setAmountValue(initialAmountState);
  }, []);

  const value: Context = {
    side,
    amount: amountValue,
    controls: { setSide, setAmount, resetAmount, setLong, setShort }
  };

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
};

export const useMarketContext = () => {
  const context = useContext(MarketContext);

  if (!context) throw new Error('MarketContext not found');

  return context;
};

export const withMarketContext =
  <P,>(Component: FC<P>) =>
  (props: P) => {
    return (
      <MarketProvider>
        <Component {...props} />
      </MarketProvider>
    );
  };
