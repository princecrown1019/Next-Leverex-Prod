import React, { FC, ReactNode, useMemo } from 'react';

import { TooltipComponent } from '~/components/Tooltip/TooltipComponent';

import style from './style.module.scss';

type Props = {
  address: string;
  children: ReactNode;
};

export const TransactionAddressTooltipComponent: FC<Props> = ({ address, children }) => {
  const tooltip = useMemo(() => <span className={style.transactionAddressTooltipValue}>{address}</span>, [address]);

  return (
    <TooltipComponent top tooltipClassName={style.transactionAddressTooltip} tooltip={tooltip}>
      {children}
    </TooltipComponent>
  );
};
