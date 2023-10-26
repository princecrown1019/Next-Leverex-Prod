import React, { FC, MouseEvent, useCallback } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  idx: null | number;
  getFlatIdx: number;
  buttons: (number | string)[];
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleGetFlatClick: () => void;
};

const minValueForFormatting = 0.05;

export const MarketPreselectedAmountsComponent: FC<Props> = ({
  className,
  getFlatIdx,
  idx,
  buttons,
  handleClick,
  handleGetFlatClick
}) => {
  const formatValue = useCallback((value: string | number) => {
    if (typeof value !== 'number') return value;

    return value < minValueForFormatting ? value.toString().replace('0.', '.') : value.toFixed(2);
  }, []);

  return (
    <div className={clsx(style.preselectedButtons, className)}>
      {buttons.map((button, buttonIdx) => (
        <ButtonComponent
          className={clsx(style.preselectedButton, buttonIdx === idx && style.preselectedButtonActive)}
          key={button}
          name={button.toString()}
          onClick={buttonIdx === getFlatIdx ? handleGetFlatClick : handleClick}
        >
          {formatValue(button)}
        </ButtonComponent>
      ))}
    </div>
  );
};
