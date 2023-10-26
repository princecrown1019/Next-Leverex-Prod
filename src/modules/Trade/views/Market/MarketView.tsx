import React, { FC, FormEvent, ReactNode } from 'react';

import clsx from 'clsx';

import { ActionButtonComponent } from '~/components/ActionButton/ActionButtonComponent';
import { TradeSideSwitcherContainer } from '~/modules/Trade/containers/SideSwitcher/SideSwitcherContainer';
import { MarketEstimatesContainer } from '~/modules/Trade/containers/Estimates/EstimatesContainer';

import style from './style.module.scss';

export type Props = {
  className?: string;
  long: boolean;
  loading: boolean;
  disabled: boolean;
  children?: ReactNode | ReactNode[];
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const MarketView: FC<Props> = ({ className, long, loading, disabled, children, handleSubmit }) => (
  <form className={clsx(style.market, className)} autoComplete="off" onSubmit={handleSubmit}>
    <div>
      <TradeSideSwitcherContainer />
      <div className={style.marketContent}>{children}</div>
    </div>
    <div>
      <MarketEstimatesContainer className={style.marketEstimates} />
      <ActionButtonComponent
        className={clsx(style.marketButton, long ? style.marketButtonLongSide : style.marketButtonShortSide)}
        type="submit"
        disabled={disabled}
        loading={loading}
      >
        Trade
      </ActionButtonComponent>
    </div>
  </form>
);
