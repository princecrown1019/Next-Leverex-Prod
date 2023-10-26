import React, { FC, MouseEvent, RefObject, useCallback } from 'react';

import clsx from 'clsx';

import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { DashboardIcon, GearIcon, TradeIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = {
  className?: string;
  activeIdx: number;
  tabsRef: RefObject<HTMLUListElement>;
  handleChange: (idx: number) => void;
};

export const ToolsTabsComponent: FC<Props> = ({ className, activeIdx, tabsRef, handleChange }) => {
  const entryActiveClass = activeIdx === 0 && style.toolsTabsButtonActive;
  const controlActiveClass = activeIdx === 1 && style.toolsTabsButtonActive;
  const apiActiveClass = activeIdx === 2 && style.toolsTabsButtonActive;

  const handleClick = useCallback(({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    handleChange(Number(currentTarget.name));
  }, []);

  return (
    <ul className={clsx(style.toolsTabs, className)} ref={tabsRef}>
      <li className={style.toolsTabsItem}>
        <ButtonComponent className={clsx(style.toolsTabsButton, entryActiveClass)} name="0" onClick={handleClick}>
          <DashboardIcon className={style.toolsTabsButtonIcon} />
          Order entry made simple
        </ButtonComponent>
      </li>

      <li className={style.toolsTabsItem}>
        <ButtonComponent className={clsx(style.toolsTabsButton, controlActiveClass)} name="1" onClick={handleClick}>
          <TradeIcon className={style.toolsTabsButtonIcon} />
          Easy to be in control
        </ButtonComponent>
      </li>

      <li className={style.toolsTabsItem}>
        <ButtonComponent className={clsx(style.toolsTabsButton, apiActiveClass)} name="2" onClick={handleClick}>
          <GearIcon className={style.toolsTabsButtonIcon} />
          Enterprise-grade API
        </ButtonComponent>
      </li>
    </ul>
  );
};
