import React, { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { TabsComponent } from '~/components/Tabs/TabsComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  tabIdx: number;
  children: ReactNode[];
  headerEnd: ReactNode;
  handleTebChange: (idx: number) => void;
};

export const HistoryView: FC<Props> = ({ className, tabIdx, headerEnd, children, handleTebChange }) => (
  <div className={clsx(style.history, className)}>
    <div className={style.historyHeader}>
      <TabsComponent
        className={style.historyTabs}
        tabClassName={style.historyTab}
        tabs={['Trades', 'Transfers']}
        tabIdx={tabIdx}
        handleChange={handleTebChange}
        rounded
      />
      <div className={style.historyHeaderEnd}>{headerEnd}</div>
    </div>
    {children[tabIdx]}
  </div>
);
