import React, { FC, MouseEvent, useCallback, useMemo } from 'react';

import clsx from 'clsx';

import { CarouselIndicatorComponent } from '~/components/CarouselIndicator/CarouselIndicatorComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  length: number;
  activeIdx?: number;
  handleChange: (idx: number) => void;
};

export const CarouselIndicatorsComponent: FC<Props> = ({ className, length, activeIdx, handleChange }) => {
  const array = useMemo(() => Array.from({ length }).fill(''), [length]);

  const handleClick = useCallback(({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    handleChange(Number(currentTarget.name));
  }, []);

  return (
    <div className={clsx(style.indicators, className)}>
      {array.map((_, idx) => (
        <CarouselIndicatorComponent key={idx} active={idx === activeIdx} idx={idx} handleClick={handleClick} />
      ))}
    </div>
  );
};
