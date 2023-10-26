import React, { FC, useMemo } from 'react';

import clsx from 'clsx';

import { ToastType } from '~/types/toastTypes';
import { ErrorStatusIcon, InfoStatusIcon, SuccessStatusIcon, WarningStatusIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = {
  className?: string;
  type: ToastType;
};

export const StatusIconComponent: FC<Props> = ({ className, type }) => {
  const Icon = useMemo(() => {
    switch (type) {
      case ToastType.ERROR:
        return ErrorStatusIcon;

      case ToastType.SUCCESS:
        return SuccessStatusIcon;

      case ToastType.WARNING:
        return WarningStatusIcon;

      default:
        return InfoStatusIcon;
    }
  }, [type]);

  return <Icon className={clsx(style.statusIcon, className)} />;
};
