import React, { FC, ReactNode, useMemo } from 'react';

import { QrCodeComponent } from '~/components/QrCode/QrCodeComponent';
import { TooltipComponent } from '~/components/Tooltip/TooltipComponent';

import style from './style.module.scss';

type Props = {
  depositAddress: string;
  children: ReactNode;
};

export const AddressQrTooltipComponent: FC<Props> = ({ depositAddress, children }) => {
  const tooltip = useMemo(
    () => (
      <div className={style.addressQrTooltipContent}>
        <p className={style.addressQrTooltipPitch}>
          Scan the code on the withdrawal page of the trading platform App or wallet App
        </p>

        <QrCodeComponent className={style.addressQrTooltipQr} size={164} value={depositAddress} />
      </div>
    ),
    [depositAddress]
  );

  return (
    <TooltipComponent tooltipClassName={style.addressQrTooltip} tooltip={tooltip}>
      {children}
    </TooltipComponent>
  );
};
