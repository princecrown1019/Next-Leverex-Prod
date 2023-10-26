import React, { FC } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
  open: boolean;
  handleClick?: () => void;
};

export const BurgerComponent: FC<Props> = ({ className, open, handleClick }) => (
  <button className={clsx(style.burger, className, open && style.burgerOpen)} onClick={handleClick}>
    <div className={style.burgerWrapper}>
      <div className={style.burgerItem} />
      <div className={style.burgerItem} />
    </div>
  </button>
);
