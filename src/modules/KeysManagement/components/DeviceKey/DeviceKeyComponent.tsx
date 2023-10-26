import React, { FC, MouseEvent } from 'react';

import clsx from 'clsx';

import { truncateText } from '~/services/TextFormat/textFormatService';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { BadgeButtonComponent } from '~/components/BadgeButton/BadgeButtonComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  label?: string;
  deviceKey: string;
  active?: boolean;
  loadingRevoke?: boolean;
  handleClick: () => void;
  handleRevokeClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const DeviceKeyComponent: FC<Props> = ({
  className,
  label,
  deviceKey,
  active,
  loadingRevoke,
  handleClick,
  handleRevokeClick
}) => {
  const classNames = [active && style.deviceKeyActive, !!handleRevokeClick && style.deviceKeyWithRevoke];

  return (
    <ButtonComponent
      className={clsx(style.deviceKey, className, ...classNames)}
      withoutRipple={!!handleRevokeClick}
      onClick={handleClick}
    >
      {handleRevokeClick ? (
        <>
          <span className={style.deviceKeyValueWithRevoke}>{deviceKey}</span>
          <BadgeButtonComponent className={style.deviceKeyRevokeButton} handleClick={handleRevokeClick}>
            {loadingRevoke ? 'Loading' : 'Revoke'}
          </BadgeButtonComponent>
        </>
      ) : (
        <>
          <span className={style.deviceKeyLabel}>{label}</span>
          &nbsp;•&nbsp;
          <span className={style.deviceKeyValueWithoutRevoke}>{truncateText(deviceKey, 10, 10)}</span>
        </>
      )}
    </ButtonComponent>
  );
};
