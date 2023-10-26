import { CreateReq as ToastCreateReq } from '~/store/Toasts/types';

/*
 * Request
 */

export type CreateReq = {
  toast: ToastCreateReq;
  notification: {
    title: string;
    body: string;
  };
};

/*
 * State
 */

export type NotificationsState = {
  allowed: null | boolean;
};
