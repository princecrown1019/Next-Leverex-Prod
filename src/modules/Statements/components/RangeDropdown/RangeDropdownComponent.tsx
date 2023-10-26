import React, { FC, useCallback, useMemo } from 'react';

import { STATEMENT_PRESELECTED_RANGE } from '~/constants/statementsConstants';
import { StatementRange } from '~/types/statemetsTypes';
import { DropdownComponent, Props as DropdownProps } from '~/components/Dropdown/DropdownComponent';
import { CalendarIcon } from '~/assets/Icons';
import { ButtonComponent } from '~/components/Button/ButtonComponent';

import style from './style.module.scss';

type Props = Omit<
  DropdownProps<StatementRange>,
  'renderSelected' | 'renderOption' | 'optionKey' | 'optionDisabled' | 'options'
> & {
  dateRange: string;
};

const options = Object.values(StatementRange).slice(0, -1);

export const RangeDropdownComponent: FC<Props> = ({ dateRange, ...props }) => {
  const endAdornment = useMemo(() => <CalendarIcon />, []);

  const renderSelected = useCallback(
    (value: null | StatementRange) => {
      if (value === StatementRange.CUSTOM) return dateRange;

      return value ? STATEMENT_PRESELECTED_RANGE[value] : null;
    },
    [dateRange]
  );

  const handleCustomClick = useCallback(() => {
    props.handleChange?.(StatementRange.CUSTOM);
  }, [props.handleChange]);

  const footer = useMemo(
    () => (
      <ButtonComponent className={style.rangeDropdownFooterButton} onClick={handleCustomClick}>
        Choose custom date range
      </ButtonComponent>
    ),
    [handleCustomClick]
  );

  const renderOption = useCallback((value: null | StatementRange) => {
    if (!value) return null;

    return (
      <div className={style.rangeDropdownOption}>
        <span className={style.rangeDropdownOptionName}>{STATEMENT_PRESELECTED_RANGE[value]}</span>
      </div>
    );
  }, []);

  return (
    <DropdownComponent
      {...props}
      label="Select date range"
      options={options}
      renderSelected={renderSelected}
      renderOption={renderOption}
      endAdornment={endAdornment}
      footer={footer}
    />
  );
};
