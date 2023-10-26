import React, { FC } from 'react';

import clsx from 'clsx';

import { ArrowUpPositiveIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = {
  className?: string;
  positive: boolean;
  visible: boolean;
  hideIfInvisible?: boolean;
  gradient?: boolean;
};

const ChangeIcon: FC<Pick<Props, 'className' | 'gradient' | 'positive'>> = ({ className, positive, gradient }) => {
  if (!gradient) return <ArrowUpPositiveIcon className={className} />;

  return positive ? (
    <span className={clsx(style.changeArrowGradient, style.changeArrowGradientUpLong, className)} />
  ) : (
    <span className={clsx(style.changeArrowGradient, style.changeArrowGradientDownShort, className)} />
  );
};

export const ChangeArrowComponent: FC<Props> = ({ className, positive, gradient, hideIfInvisible, visible }) => {
  const classes = [!gradient && !positive && style.changeArrowNegative, !visible && style.changeArrowInvisible];

  if (hideIfInvisible && !visible) return null;

  return (
    <ChangeIcon className={clsx(style.changeArrow, ...classes, className)} positive={positive} gradient={gradient} />
  );
};
