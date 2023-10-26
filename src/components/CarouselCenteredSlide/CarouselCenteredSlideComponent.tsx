import React, { FC, MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';

export type Props = {
  className?: string;
  activeClassName?: string;
  active: boolean;
  idx: number;
  children: ReactNode;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const CarouselCenteredSlideComponent: FC<Props> = ({
  className,
  activeClassName,
  idx,
  active,
  children,
  handleClick
}) => (
  <ButtonComponent
    className={clsx(className, active && activeClassName)}
    name={idx.toString()}
    disabled={active}
    onClick={handleClick}
    withoutRipple
  >
    {children}
  </ButtonComponent>
);
