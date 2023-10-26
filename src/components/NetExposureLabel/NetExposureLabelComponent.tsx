import React, { FC, useMemo } from 'react';

import clsx from 'clsx';

import { OrderExposureLabel } from '~/types/orderTypes';
import { TextGradientComponent } from '~/components/TextGradient/TextGradientComponent';

import style from './style.module.scss';

type Props = {
  className?: string;
  value: number;
};

export const NetExposureLabelComponent: FC<Props> = ({ className, value }) => {
  const children = useMemo(() => {
    if (!value) return OrderExposureLabel.FLAT;

    return value > 0 ? OrderExposureLabel.LONG : OrderExposureLabel.SHORT;
  }, [value]);

  return (
    <TextGradientComponent className={clsx(style.netExposureLabel, className)} positive={value > 0} visible={!!value}>
      {children}
    </TextGradientComponent>
  );
};
