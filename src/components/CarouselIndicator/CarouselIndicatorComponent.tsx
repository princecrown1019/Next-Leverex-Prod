import React, { FC, MouseEvent } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

export type Props = {
  idx: number;
  active?: boolean;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const CarouselIndicatorComponent: FC<Props> = ({ idx, active, handleClick }) => (
  <ButtonComponent
    className={clsx(style.indicatorButton, active && style.indicatorButtonActive)}
    name={idx.toString()}
    withoutRipple
    onClick={handleClick}
  />
);
