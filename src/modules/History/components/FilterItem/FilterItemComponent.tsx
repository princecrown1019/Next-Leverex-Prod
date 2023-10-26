import React, { useCallback } from 'react';

import clsx from 'clsx';

import { FilterState } from '~/types/filterTypes';
import { CheckboxComponent } from '~/components/Checkbox/CheckboxComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

export type Props<T extends Record<string, unknown>> = {
  criteria: FilterState<T>;
  idx: number;
  handleChange: (criteria: FilterState<T>, idx: number) => void;
};

export const FilterItemComponent = <T extends Record<string, unknown>>({ criteria, idx, handleChange }: Props<T>) => {
  const handleMenuItemClick = useCallback(() => {
    handleChange({ ...criteria, value: !criteria.value }, idx);
  }, [criteria.label, criteria.value, idx]);

  return (
    <ButtonComponent className={clsx(style.filterMenuItem, 'tw-group')} onClick={handleMenuItemClick}>
      <CheckboxComponent className={style.filterMenuItemCheckBox} disabled value={criteria.value} />
      {criteria.label}
    </ButtonComponent>
  );
};
