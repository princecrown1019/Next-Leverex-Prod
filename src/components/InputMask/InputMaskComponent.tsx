import React, { forwardRef, useMemo } from 'react';

import clsx from 'clsx';

import { InputComponent, Props as InputProps } from '~/components/Input/InputComponent';

import style from './style.module.scss';

export type Props = Omit<InputProps, 'startAdornment'> & {
  maskValue?: string;
};

export const InputMaskComponent = forwardRef<HTMLInputElement, Props>(({ maskValue, ...props }, ref) => {
  const startAdornment = useMemo(
    () => (
      <input
        className={clsx(style.inputMask, !!props.endAdornment && style.inputMaskWithEndAdornment)}
        value={maskValue}
        spellCheck={false}
        disabled
      />
    ),
    [maskValue, !props.endAdornment]
  );

  return <InputComponent {...props} ref={ref} startAdornment={startAdornment} staticLabel />;
});
