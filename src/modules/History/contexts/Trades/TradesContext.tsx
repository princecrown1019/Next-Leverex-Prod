import React, { createContext, FC, PropsWithChildren, ReactNode, useCallback, useContext, useState } from 'react';

import { FilterState } from '~/types/filterTypes';
import { Order, RolloverType } from '~/types/orderTypes';
import { PRODUCT_SIDES_NAME } from '~/constants/productConstants';
import { ProductSide } from '~/types/productTypes';

type Context = {
  filterState: FilterState<Order<number>>[];
  handleFilterChange: (criteria: FilterState<Order<number>>) => void;
};

const TradesContext = createContext<null | Context>(null);

const initialState: FilterState<Order<number>>[] = [
  {
    label: PRODUCT_SIDES_NAME[ProductSide.SELL],
    key: 'side',
    keyValue: ProductSide.SELL,
    value: false
  },
  {
    label: PRODUCT_SIDES_NAME[ProductSide.BUY],
    key: 'side',
    keyValue: ProductSide.BUY,
    value: false
  },
  {
    label: 'Hide rollover positions',
    key: 'rolloverType',
    keyValue: RolloverType.NOT_ROLLOVER,
    value: false
  },
  {
    label: 'Defaulted',
    key: 'clientIsDefault',
    keyValue: true,
    value: false
  },
  {
    label: 'Liquidated',
    key: 'clientIsLiquidation',
    keyValue: true,
    value: false
  }
];

export const TradesContextProvider: FC<PropsWithChildren<ReactNode | ReactNode[]>> = ({ children }) => {
  const [state, setState] = useState(initialState);

  const handleFilterChange = useCallback((criteria: FilterState<Order<number>>) => {
    setState((prevState) => {
      return prevState.map((prevCriteria) => {
        return prevCriteria.label === criteria.label ? criteria : prevCriteria;
      });
    });
  }, []);

  return <TradesContext.Provider value={{ filterState: state, handleFilterChange }}>{children}</TradesContext.Provider>;
};

export const useTradesContext = () => {
  const context = useContext(TradesContext);

  if (!context) throw new Error('TradesContext not found');

  return context;
};
