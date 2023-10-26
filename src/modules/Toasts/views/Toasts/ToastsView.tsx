import React, { FC, MouseEvent, RefObject } from 'react';

import { ToastComponent } from '~/modules/Toasts/components/Toast/ToastComponent';
import { Toast } from '~/types/toastTypes';

import style from './style.module.scss';

export type Props = {
  containerRef: RefObject<HTMLDivElement>;
  toasts: Toast[];
  visibleIds: string[];
  handleToastClose: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ToastsView: FC<Props> = ({ toasts, visibleIds, containerRef, handleToastClose }) => (
  <div className={style.toasts} ref={containerRef}>
    {toasts.map((toast) => (
      <ToastComponent
        key={toast.id}
        type={toast.type}
        visible={visibleIds.includes(toast.id)}
        id={toast.id}
        message={toast.message}
        duration={5000}
        handleClose={handleToastClose}
      />
    ))}
  </div>
);
