import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToastType } from '~/types/toastTypes';
import { selectLoggedIn } from '~/store/Session/selectors';
import { toastsActions } from '~/store/Toasts/slice';
import { requestDesktopNotificationsPermission } from '~/services/DesktopNotifications/desktopNotificationsService';

export const useRequestNotificationsPermissionCommand = (option: boolean) => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (!loggedIn || option) return;

    requestDesktopNotificationsPermission(null, () => {
      dispatch(
        toastsActions.create({
          type: ToastType.WARNING,
          message: `Please, allow ${window.location.host} to send desktop notifications in your browser's settings`
        })
      );
    });
  }, [option]);
};
