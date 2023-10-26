import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';

import { useOutsideClick } from '~/hooks/OutsideClick/useOutsideClick';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { DropdownArrowComponent } from '~/components/DropdownArrow/DropdownArrowComponent';
import { DropdownOptionComponent } from '~/components/DropdownOption/DropdownOptionComponent';

import style from './style.module.scss';

export type Props<T> = {
  className?: string;
  label?: string;
  options: T[];
  value: null | T;
  customVisible?: boolean;
  endAdornment?: ReactNode;
  footer?: ReactNode;
  disabled?: boolean;
  staticLabel?: boolean;
  renderSelected: (value: null | T) => ReactNode;
  renderOption?: (option: T) => ReactNode;
  optionKey?: (option: T) => string;
  optionDisabled?: (option: T) => boolean;
  handleChange?: (value: T) => void;
};

export const DropdownComponent = <T,>({
  className,
  label,
  options,
  value,
  customVisible,
  staticLabel,
  endAdornment,
  footer,
  renderSelected,
  disabled,
  optionDisabled,
  optionKey,
  renderOption,
  handleChange
}: Props<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  useOutsideClick(containerRef, () => {
    setVisible(false);
  });

  useEffect(() => {
    if (typeof customVisible === 'undefined') return;

    setVisible(customVisible);
  }, [customVisible]);

  useEffect(() => {
    setVisible(false);
  }, [value]);

  const handleClick = useCallback(() => {
    if (disabled) return;

    setVisible((prevVisible) => !prevVisible);
  }, [disabled]);

  const handleItemClick = useCallback(
    (item: T) => () => {
      if (!handleChange) return;

      setVisible(false);
      handleChange(item);
    },
    [options]
  );

  const valueNode = useMemo(() => renderSelected(value), [renderSelected, value]);

  return (
    <div
      className={clsx(style.dropdownContainer, className, visible && style.dropdownContainerVisible)}
      ref={containerRef}
    >
      <ButtonComponent className={style.dropdownButton} disabled={disabled} onClick={handleClick} withoutRipple>
        <div className={style.dropdownContainerLeft}>
          <label
            className={clsx(
              style.dropdownLabel,
              (staticLabel || (!visible && valueNode)) && style.dropdownFocusedLabel
            )}
          >
            {label}
          </label>
          <div className={clsx(style.dropdownSelected, visible && style.dropdownSelectedVisible)}>{valueNode}</div>
        </div>
        {typeof endAdornment === 'undefined' ? <DropdownArrowComponent open={visible} /> : endAdornment}
      </ButtonComponent>

      {renderOption ? (
        <div className={clsx(style.dropdownContent, visible && style.dropdownContentVisible)}>
          <ul className={style.dropdownContentList}>
            {options.map((option, idx) => (
              <DropdownOptionComponent
                key={optionKey?.(option) || `${idx.toFixed(1)}`}
                disabled={optionDisabled?.(option)}
                handleClick={handleItemClick(option)}
              >
                {renderOption(option)}
              </DropdownOptionComponent>
            ))}
          </ul>
          {footer}
        </div>
      ) : null}
    </div>
  );
};
