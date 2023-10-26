import React, { forwardRef, InputHTMLAttributes, ReactNode, FocusEvent, useCallback, useRef, useMemo } from 'react';

import clsx from 'clsx';

import { useClipboard } from '~/hooks/Clipboard/useClipboard';
import { useCombinedRef } from '~/hooks/CombinedRef/useCombinedRef';
import { BadgeButtonComponent } from '~/components/BadgeButton/BadgeButtonComponent';

import style from './style.module.scss';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: null | string | boolean;
  staticLabel?: boolean;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  onPasteClick?: (value: string) => void;
};

export const InputComponent = forwardRef<HTMLInputElement, Props>(
  ({ className, label, staticLabel, error, startAdornment, endAdornment, onPasteClick, ...props }, ref) => {
    const inputRef = useCombinedRef<HTMLInputElement>(ref);
    const labelRef = useRef<HTMLLabelElement>(null);

    const { readFromClipboard } = useClipboard();

    const inputId = `${label || props.placeholder}-input`;
    const invalid = !!error;

    const handlePaste = useCallback(() => {
      if (props.disabled) return;

      readFromClipboard((value) => {
        inputRef.current?.focus();

        onPasteClick?.(value);
        labelRef.current?.classList.add(style.inputFocusedLabel);
      });
    }, [props.disabled]);

    const pasteEndAdornment = useMemo(() => {
      if (!onPasteClick) return null;

      return (
        <BadgeButtonComponent className={style.inputPasteEndAdornment} handleClick={handlePaste}>
          Paste
        </BadgeButtonComponent>
      );
    }, [onPasteClick]);

    const handleFocus = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        props.onFocus?.(event);

        if (!staticLabel) {
          labelRef.current?.classList.add(style.inputFocusedLabel);
        }
      },
      [staticLabel]
    );

    const handleBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        props.onBlur?.(event);

        if (!event.currentTarget.value && !staticLabel) {
          labelRef.current?.classList.remove(style.inputFocusedLabel);
        }
      },
      [staticLabel]
    );

    const inputClasses = [
      invalid && style.inputInvalid,
      !!(pasteEndAdornment || endAdornment) && style.inputWithEndAdornment
    ];

    return (
      <div className={clsx(style.inputContainer, className, invalid && style.inputContainerInvalid)}>
        <div className={style.inputContainerLeft}>
          <label
            className={clsx(
              style.inputLabel,
              staticLabel && style.inputFocusedLabel,
              invalid && style.inputLabelInvalid
            )}
            htmlFor={inputId}
            ref={labelRef}
          >
            {label}
          </label>
          <div className={style.inputWrapper}>
            {startAdornment}
            <input
              {...props}
              className={clsx(style.input, ...inputClasses)}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              ref={inputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-invalid={!!error}
              id={inputId}
            />
          </div>
        </div>
        {pasteEndAdornment || endAdornment}
      </div>
    );
  }
);
