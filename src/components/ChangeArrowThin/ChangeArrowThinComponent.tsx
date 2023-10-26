import React, { FC } from 'react';

import clsx from 'clsx';

import { ArrowThinUpPositiveIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = {
  className?: string;
  positive: boolean;
  visible: boolean;
};

export const ChangeArrowThinComponent: FC<Props> = ({ className, positive, visible }) => {
  if (!visible) return null;

  return <ArrowThinUpPositiveIcon className={clsx(!positive && style.changeArrowThinNegative, className)} />;
};
