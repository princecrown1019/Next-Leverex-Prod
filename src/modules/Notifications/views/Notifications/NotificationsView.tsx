import React, { FC } from 'react';

import clsx from 'clsx';

import { SwitchableRowComponent } from '~/components/SwitchableRow/SwitchableRowComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  allowed: null | boolean;
  handleChange: (value: boolean, name?: string) => void;
};

export const NotificationsView: FC<Props> = ({ className, allowed, handleChange }) => (
  <div className={clsx(style.notifications, className)}>
    <SwitchableRowComponent
      active={allowed}
      title="Desktop notifications"
      description="Turn desktop notifications"
      handleChange={handleChange}
    />
  </div>
);
