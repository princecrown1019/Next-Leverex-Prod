import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ToastType } from '~/types/toastTypes';
import { notificationsActions } from '~/store/Notifications/slice';
import { toastsActions } from '~/store/Toasts/slice';
import { requestDesktopNotificationsPermission } from '~/services/DesktopNotifications/desktopNotificationsService';
import { useDebounce } from '~/hooks/Debounce/useDebounce';

export const useAllowNotificationsCommand = (allowed: null | boolean, deniedCallback: () => void) => {
  const dispatch = useDispatch();

  const debouncedAllowed = useDebounce(allowed, 300);

  useEffect(() => {
    if (typeof debouncedAllowed !== 'boolean') return;

    if (debouncedAllowed) {
      requestDesktopNotificationsPermission(
        () => {
          dispatch(notificationsActions.setAllowed(true));
        },
        () => {
          deniedCallback();

          dispatch(notificationsActions.setAllowed(false));

          dispatch(
            toastsActions.create({
              type: ToastType.ERROR,
              message: `Your browser's settings do not allow ${window.location.host} to send desktop notifications`
            })
          );
        }
      );
    } else {
      dispatch(notificationsActions.setAllowed(false));
    }
  }, [debouncedAllowed]);
};
