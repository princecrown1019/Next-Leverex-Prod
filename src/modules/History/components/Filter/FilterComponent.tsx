import React, { useCallback, useRef, useState } from 'react';

import clsx from 'clsx';

import { FilterState } from '~/types/filterTypes';
import { useOutsideClickOptional } from '~/hooks/OutsideClick/useOutsideClick';
import { DropdownArrowComponent } from '~/components/DropdownArrow/DropdownArrowComponent';
import { BadgeButtonComponent } from '~/components/BadgeButton/BadgeButtonComponent';
import { FilterItemComponent } from '~/modules/History/components/FilterItem/FilterItemComponent';

import style from './style.module.scss';

export type Props<T extends Record<string, unknown>> = {
  className?: string;
  state: FilterState<T>[];
  handleChange: (criteria: FilterState<T>, idx: number) => void;
};

export const FilterComponent = <T extends Record<string, unknown>>({ className, state, handleChange }: Props<T>) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  useOutsideClickOptional(listRef, visible, handleClose);

  const handleToggle = useCallback(() => {
    setVisible((prevVisible) => !prevVisible);
  }, []);

  const renderMenuItem = useCallback(
    (criteria: FilterState<T>, idx: number) => (
      <FilterItemComponent key={criteria.label} criteria={criteria} handleChange={handleChange} idx={idx} />
    ),
    [state]
  );

  return (
    <div className={clsx(style.filterWrapper, className)}>
      <div className={clsx(style.filterContainer, visible && style.filterContainerActive)}>
        <div className={style.filterHeader}>
          <BadgeButtonComponent className={style.filterButton} ref={anchorRef} secondary handleClick={handleToggle}>
            Filter
            <DropdownArrowComponent className={style.filterButtonIcon} open={visible} />
          </BadgeButtonComponent>
        </div>
        {visible && (
          <div className={style.filterMenuList} ref={listRef}>
            {state.map((criteria, idx) => renderMenuItem(criteria, idx))}
          </div>
        )}
      </div>
    </div>
  );
};
