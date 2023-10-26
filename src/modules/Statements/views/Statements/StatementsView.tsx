import React, { FC, FormEvent, ReactNode, RefObject, useCallback } from 'react';

import clsx from 'clsx';

import { StatementFormat, StatementRange } from '~/types/statemetsTypes';
import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';
import { DropdownComponent } from '~/components/Dropdown/DropdownComponent';
import { RangeDropdownComponent } from '~/modules/Statements/components/RangeDropdown/RangeDropdownComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  dateRange: string;
  rangeValue: null | StatementRange;
  pickerRef: RefObject<HTMLDivElement>;
  format: null | StatementFormat;
  formatOptions: StatementFormat[];
  loading: boolean;
  disabled: boolean;
  selectorVisible: boolean;
  handleRangeDropdownChange: (value: StatementRange) => void;
  handleFormatChange: (value: StatementFormat) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export const StatementsView: FC<Props> = ({
  className,
  dateRange,
  format,
  pickerRef,
  formatOptions,
  rangeValue,
  loading,
  selectorVisible,
  disabled,
  children,
  handleRangeDropdownChange,
  handleFormatChange,
  handleSubmit
}) => {
  const renderOption = useCallback(
    (selected?: boolean) => (value: null | StatementFormat) => {
      if (!value) return null;

      return <span className={clsx(style.statementsOption, selected && style.statementsOptionSelected)}>{value}</span>;
    },
    []
  );

  return (
    <form className={clsx(style.statements, className)} onSubmit={handleSubmit}>
      <div className={style.statementsColumn}>
        <RangeDropdownComponent
          handleChange={handleRangeDropdownChange}
          disabled={loading}
          dateRange={dateRange}
          customVisible={!selectorVisible}
          value={rangeValue}
        />
        <DropdownComponent
          className={style.statementsInput}
          label="Output format"
          value={format}
          endAdornment={null}
          disabled
          options={formatOptions}
          handleChange={handleFormatChange}
          renderSelected={renderOption(true)}
          renderOption={renderOption()}
        />
        <ActionButtonComponent className={style.statementsButton} loading={loading} disabled={disabled} type="submit">
          Download
        </ActionButtonComponent>
      </div>
      <div className={style.statementsColumn}>
        {selectorVisible && (
          <div className={style.statementsDateRangePickerContainer} ref={pickerRef}>
            {children}
          </div>
        )}
      </div>
    </form>
  );
};
