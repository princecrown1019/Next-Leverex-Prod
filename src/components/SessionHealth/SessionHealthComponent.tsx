import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import clsx from 'clsx';

import { selectCurrentSessionHealth } from '~/store/Market/selectors';
import { selectCurrentProductTradingClosed } from '~/store/Stats/selectors';

import style from './style.module.scss';

export type Props = {
  className?: string;
};

export const SessionHealthComponent: FC<Props> = ({ className }) => {
  const [status, setStatus] = useState<number>(0);
  const classNameByStatus = ['damaged', 'closed', 'operational'];
  const statusString = ['Damaged', 'Closed', 'Operational'];

  const openStatus = useSelector(selectCurrentSessionHealth);
  const closedStatus = useSelector(selectCurrentProductTradingClosed);

  useEffect(() => {
    if (openStatus && !closedStatus) {
      setStatus(2);
    } else if (openStatus && closedStatus) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  }, [openStatus, closedStatus]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
    <div className={clsx(style.systemHealth, className)}>
      {
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div className={style.content}>
          <div className={clsx(style.dot, style[classNameByStatus[status]])} />
          {statusString[status]}
        </div>
      }
    </div>
  );
};
