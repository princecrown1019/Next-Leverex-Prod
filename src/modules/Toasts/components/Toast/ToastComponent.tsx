import React, { memo, MouseEvent, useEffect, useMemo, useRef } from 'react';

import { ToastType } from '~/types/toastTypes';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { DividerComponent } from '~/components/Divider/DividerComponent';
import { StatusIconComponent } from '~/components/StatusIcon/StatusIconComponent';
import { CloseIcon } from '~/assets/Icons';

import style from './style.module.scss';

type Props = {
  type: ToastType;
  id: string;
  duration: number;
  visible: boolean;
  message: string;
  handleClose: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ToastComponent = memo<Props>(({ type, id, duration, visible, message, handleClose }) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    toastRef.current?.classList.toggle(style.toastVisible, visible);
  }, [visible]);

  useEffect(() => {
    const outTimeout = setTimeout(() => {
      closeRef.current?.click();
    }, duration);

    return () => {
      clearTimeout(outTimeout);
    };
  }, []);

  return useMemo(
    () => (
      <div className={style.toast} ref={toastRef}>
        <StatusIconComponent className={style.toastIcon} type={type} />

        <DividerComponent className={style.toastDivider} vertical />

        <span className={style.toastMessage}>{message}</span>

        <ButtonComponent className={style.toastCloseButton} name={id} ref={closeRef} onClick={handleClose}>
          <CloseIcon className={style.toastCloseIcon} />
        </ButtonComponent>
      </div>
    ),
    [message, type, id]
  );
});
