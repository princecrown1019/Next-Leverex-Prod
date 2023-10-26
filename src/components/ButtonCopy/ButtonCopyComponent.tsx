import React, { forwardRef, useCallback } from 'react';

import { useClipboard } from '~/hooks/Clipboard/useClipboard';
import { ButtonComponent, Props as ButtonProps } from '~/components/Button/ButtonComponent';
import { CopyIcon } from '~/assets/Icons';

export type Props = ButtonProps & {
  iconClassName?: string;
  value?: string;
};

export const ButtonCopyComponent = forwardRef<HTMLButtonElement, Props>(({ iconClassName, value, ...props }, ref) => {
  const { copyToClipboard } = useClipboard();

  const handleClick = useCallback(() => {
    copyToClipboard(value);
  }, [value]);

  return (
    <ButtonComponent {...props} ref={ref} onClick={handleClick}>
      <CopyIcon className={iconClassName} />
    </ButtonComponent>
  );
});
