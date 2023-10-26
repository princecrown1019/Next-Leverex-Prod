import { Toast, ToastType } from '~/types/toastTypes';

/*
 * Request
 */

export type CreateReq = {
  type: ToastType;
  message: string;
  closeCallback?: () => void;
};

export type RemoveReq = {
  id: string;
};

/*
 * State
 */

export type ToastsState = {
  toasts: Toast[];
};
