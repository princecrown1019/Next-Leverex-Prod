import React, { FC, ReactNode, MouseEvent } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  visible: boolean;
  name?: string;
  sticky?: boolean;
  children: [ReactNode, ReactNode];
  handleToggle: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const AccordionComponent: FC<Props> = ({
  className,
  headerClassName,
  bodyClassName,
  visible,
  name,
  sticky,
  children,
  handleToggle
}) => (
  <div className={clsx(style.accordion, className)}>
    <ButtonComponent
      className={clsx(style.accordionHeader, headerClassName, sticky && style.accordionHeaderSticky)}
      name={name}
      withoutRipple
      onClick={handleToggle}
    >
      {children[0]}
    </ButtonComponent>
    <div className={clsx(style.accordionBody, bodyClassName, visible && style.accordionBodyVisible)}>{children[1]}</div>
  </div>
);
