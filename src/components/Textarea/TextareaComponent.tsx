import React, { forwardRef, TextareaHTMLAttributes, ReactNode, FocusEvent, useCallback, useRef, useMemo } from 'react';

import clsx from 'clsx';

import { useClipboard } from '~/hooks/Clipboard/useClipboard';
import { useCombinedRef } from '~/hooks/CombinedRef/useCombinedRef';
import { BadgeButtonComponent } from '~/components/BadgeButton/BadgeButtonComponent';

import style from './style.module.scss';

export type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: null | string | boolean;
  staticLabel?: boolean;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  onPasteClick?: (value: string) => void;
};

export const TextareaComponent = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, label, staticLabel, error, startAdornment, endAdornment, onPasteClick, ...props }, ref) => {
    const textareaRef = useCombinedRef<HTMLTextAreaElement>(ref);
    const labelRef = useRef<HTMLLabelElement>(null);

    const { readFromClipboard } = useClipboard();

    const inputId = `${label || props.placeholder}-input`;
    const invalid = !!error;

    const handlePasteClick = useCallback(() => {
      readFromClipboard((value) => {
        textareaRef.current?.focus();

        onPasteClick?.(value);
      });
    }, []);

    const pasteEndAdornment = useMemo(() => {
      if (!onPasteClick) return null;

      return (
        <BadgeButtonComponent className={style.textareaPasteEndAdornment} handleClick={handlePasteClick}>
          Paste
        </BadgeButtonComponent>
      );
    }, [onPasteClick]);

    const handleFocus = useCallback(
      (event: FocusEvent<HTMLTextAreaElement>) => {
        if (props.disabled) return;

        props.onFocus?.(event);

        if (!staticLabel) {
          labelRef.current?.classList.add(style.textareaFocusedLabel);
        }
      },
      [staticLabel, props.disabled]
    );

    const handleBlur = useCallback(
      (event: FocusEvent<HTMLTextAreaElement>) => {
        props.onBlur?.(event);

        if (!event.currentTarget.value && !staticLabel) {
          labelRef.current?.classList.remove(style.textareaFocusedLabel);
        }
      },
      [staticLabel]
    );

    return (
      <div className={clsx(style.textareaContainer, className, invalid && style.textareaContainerInvalid)}>
        <div className={style.textareaContainerLeft}>
          <label
            className={clsx(
              style.textareaLabel,
              staticLabel && style.textareaFocusedLabel,
              invalid && style.textareaLabelInvalid
            )}
            htmlFor={inputId}
            ref={labelRef}
          >
            {label}
          </label>
          <div className={style.textareaWrapper}>
            {startAdornment}
            <textarea
              {...props}
              className={clsx(
                style.textarea,
                invalid && style.textareaInvalid,
                !!(pasteEndAdornment || endAdornment) && style.textareaWithEndAdornment
              )}
              ref={textareaRef}
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
