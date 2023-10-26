import React, { MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

type Props<T> = {
  visibleClassName?: string;
  visible: boolean;
  disabled?: boolean;
  children: ReactNode;
  rows?: T[];
  renderRow: (item: T, idx: number) => ReactNode;
  handleToggle?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const TradesAccordionComponent = <T,>({
  visibleClassName,
  visible,
  rows,
  disabled,
  renderRow,
  children,
  handleToggle
}: Props<T>) => {
  return (
    <div>
      <ButtonComponent
        className={clsx(style.tradesAccordionHeader, style.tradesAccordionHeaderVisible, visibleClassName)}
        disabled={disabled || !handleToggle}
        onClick={handleToggle}
        withoutRipple
      >
        {children}
      </ButtonComponent>
      {visible ? <div>{rows?.map(renderRow)}</div> : null}
    </div>
  );
};
