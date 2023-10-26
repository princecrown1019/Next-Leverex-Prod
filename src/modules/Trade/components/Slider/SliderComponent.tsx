import React, { FC } from 'react';

import { SliderComponent } from '~/components/Slider/SliderComponent';

import style from './style.module.scss';

export type Props = {
  max: number;
  min?: number;
  step: number;
  value: number;
  handleChange: (value: number) => void;
  handleMouseUp?: (value: number) => void;
};

export const TradeSliderComponent: FC<Props> = ({ min, max, step, value, handleChange, handleMouseUp }) => (
  <SliderComponent
    className={style.tradeSlider}
    min={min}
    max={max}
    step={step}
    value={value}
    withMax
    withMin
    markers={4}
    handleMouseUp={handleMouseUp}
    handleChange={handleChange}
  />
);
