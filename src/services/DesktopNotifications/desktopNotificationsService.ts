import { ENV, PROD } from '~/constants/configConstants';

enum Permission {
  DEFAULT = 'default',
  GRANTED = 'granted',
  DENIED = 'denied'
}

const ICON_URL = '/static/media/notification-icon.png';

export const requestDesktopNotificationsPermission = (
  grantedCallback?: null | (() => void),
  deniedCallback?: null | (() => void)
) => {
  if (typeof window === 'undefined') return;

  Notification.requestPermission((permission) => {
    if (permission === Permission.GRANTED) {
      grantedCallback?.();
      return;
    }

    if (permission === Permission.DENIED) {
      deniedCallback?.();
      return;
    }
  });
};

export const sendDesktopNotification = (title: string, body: string, deniedCallback?: () => void) => {
  requestDesktopNotificationsPermission(() => {
    const titleWithEnv = `${PROD ? '' : `[${ENV}] `}${title}`;

    new Notification(titleWithEnv, { body, icon: ICON_URL, timestamp: Date.now() });
  }, deniedCallback);
};
