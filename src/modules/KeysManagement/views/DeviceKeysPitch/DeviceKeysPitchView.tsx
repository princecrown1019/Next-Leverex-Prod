import React, { FC } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

export type Props = {
  className?: string;
  loading: boolean;
  empty: boolean;
};

export const DeviceKeysPitchView: FC<Props> = ({ className, loading, empty }) => {
  if (loading) return null;

  return empty ? (
    <p className={clsx(style.deviceKeysPitch, className)}>You have no keys associated with your Leverex account.</p>
  ) : (
    <p className={clsx(style.deviceKeysPitch, className)}>
      This is a list of device keys associated with your account. Be sure to remove any keys that you do not recognize.
    </p>
  );
};
