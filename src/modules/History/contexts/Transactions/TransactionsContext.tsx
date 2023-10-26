import React, { createContext, FC, PropsWithChildren, ReactNode, useCallback, useContext, useState } from 'react';

import { FilterState } from '~/types/filterTypes';
import { LiquidTransaction } from '~/types/liquidTransactionTypes';
import { TransactionType } from '~/types/transactionTypes';

type Context = {
  filterState: FilterState<LiquidTransaction<number>>[];
  handleFilterChange: (criteria: FilterState<LiquidTransaction<number>>) => void;
};

const TransactionsContext = createContext<null | Context>(null);

const initialState: FilterState<LiquidTransaction<number>>[] = [
  {
    label: 'Deposits',
    key: 'type',
    keyValue: TransactionType.DEPOSIT,
    value: false
  },
  {
    label: 'Withdrawals',
    key: 'type',
    keyValue: TransactionType.WITHDRAWAL,
    value: false
  }
];

export const TransactionsContextProvider: FC<PropsWithChildren<ReactNode | ReactNode[]>> = ({ children }) => {
  const [state, setState] = useState(initialState);

  const handleFilterChange = useCallback((criteria: FilterState<LiquidTransaction<number>>) => {
    setState((prevState) => {
      return prevState.map((prevCriteria) => {
        return prevCriteria.label === criteria.label ? criteria : prevCriteria;
      });
    });
  }, []);

  return (
    <TransactionsContext.Provider value={{ filterState: state, handleFilterChange }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);

  if (!context) throw new Error('TransactionsContext not found');

  return context;
};
