import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { TESTNET_ENV } from '~/constants/configConstants';
import { TabsComponent } from '~/components/Tabs/TabsComponent';
import { LoadingSessionWrapperComponent } from '~/components/LoadingSessionWrapper/LoadingSessionWrapperComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  rounded?: boolean;
  openQuantity: number;
  workingQuantity: number;
  tabIdx: number;
  loggedIn: null | boolean;
  children: ReactNode | ReactNode[];
  handleTabChange: (value: number) => void;
};

export const PositionsView: FC<Props> = ({
  className,
  rounded,
  openQuantity,
  workingQuantity,
  loggedIn,
  tabIdx,
  children,
  handleTabChange
}) => {
  const body = (
    <>
      <div className={clsx(style.positionsTabs, rounded && style.positionsTabsRounded)}>
        <TabsComponent
          rounded={rounded}
          tabIdx={tabIdx}
          tabClassName={style.positionsTab}
          tabs={['Open positions', 'Working positions']}
          tagsVisible={loggedIn}
          tags={[openQuantity, workingQuantity]}
          handleChange={handleTabChange}
        />
      </div>
      <div className={clsx(style.positionsList, TESTNET_ENV && style.positionsListTestnet)}>{children}</div>
    </>
  );

  return rounded ? (
    <LoadingSessionWrapperComponent className={clsx(style.positions, className, rounded && style.positionsRounded)}>
      {body}
    </LoadingSessionWrapperComponent>
  ) : (
    <div className={clsx(style.positions, className, rounded && style.positionsRounded)}>{body}</div>
  );
};
