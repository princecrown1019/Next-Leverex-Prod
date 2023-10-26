import React, { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { NotificationsView, Props as ViewProps } from '~/modules/Notifications/views/Notifications/NotificationsView';
import { selectNotificationsAllowed } from '~/store/Notifications/selectors';
import { useAllowNotificationsCommand } from '~/modules/Notifications/commands/AllowNotifications/useAllowNotificationsCommand';

type Props = Pick<ViewProps, 'className'>;

export const NotificationsContainer: FC<Props> = ({ className }) => {
  const notificationsAllowed = useSelector(selectNotificationsAllowed);

  const [allowed, setAllowed] = useState(notificationsAllowed);

  useAllowNotificationsCommand(allowed, () => {
    setAllowed(false);
  });

  const handleChange = useCallback((value: boolean) => {
    setAllowed(value);
  }, []);

  return <NotificationsView className={className} allowed={allowed} handleChange={handleChange} />;
};
