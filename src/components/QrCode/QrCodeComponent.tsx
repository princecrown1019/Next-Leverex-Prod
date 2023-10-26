import React, { FC } from 'react';
import QRCode from 'react-qr-code';

import clsx from 'clsx';

import { LoadingComponent } from '~/components/Loading/LoadingComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  size: number;
  value: null | string;
  loading?: boolean;
};

export const QrCodeComponent: FC<Props> = ({ className, value, loading, size }) => {
  const notVisible = (!value && loading) || !value;

  return (
    <div className={clsx(style.qrCodeContainer, className, notVisible && style.qrCodeContainerLoading)}>
      {notVisible ? (
        <div className={style.qrCodeLoadingContainer} style={{ width: size, height: size }}>
          <LoadingComponent className={style.qrCodeLoading} visible={loading} />
        </div>
      ) : (
        <QRCode value={value!} size={size} />
      )}
    </div>
  );
};
