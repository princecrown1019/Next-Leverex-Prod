import React, { ReactNode } from 'react';

import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

type Props = {
  persistor: Persistor;
  children: ReactNode | ReactNode[];
};

export const PersistGateSSR: React.FC<Props> = ({ persistor, children }) => {
  return typeof window === 'undefined' ? <>{children}</> : <PersistGate persistor={persistor}>{children}</PersistGate>;
};
