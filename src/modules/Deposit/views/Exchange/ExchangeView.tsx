import React, { FC } from 'react';

import clsx from 'clsx';

import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';
import { SideShiftIcon } from '~/assets/Icons';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { SIDE_SHIFT_URL } from '~/constants/configConstants';

import style from './style.module.scss';

export type Props = {
  className?: string;
  loading: boolean;
  handleClick: () => void;
};

export const ExchangeView: FC<Props> = ({ className, loading, handleClick }) => (
  <div className={clsx(style.exchange, className)}>
    <div className={style.depositColumn}>
      <ActionButtonComponent className={style.exchangeButton} loading={loading} handleClick={handleClick}>
        <SideShiftIcon className={style.exchangeButtonIcon} />
      </ActionButtonComponent>

      <p className={style.exchangePitch}>
        Exchange any funds into USDT using&nbsp;
        <LinkComponent href={SIDE_SHIFT_URL} target="_blank">
          SideShift.io
        </LinkComponent>
        .
      </p>
    </div>
  </div>
);
