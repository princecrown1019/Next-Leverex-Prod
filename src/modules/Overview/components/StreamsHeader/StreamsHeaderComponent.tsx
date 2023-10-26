import React, { memo, ReactNode } from 'react';

import style from './style.module.scss';

export type Props = {
  children: ReactNode;
};

export const StreamsHeaderComponent = memo<Props>(({ children }) => (
  <>
    <div className={style.streamsHeader}>
      <div className={style.streamsHeaderLabel}>Bid size</div>
      <div className={style.streamsHeaderLabel}>Bid price</div>
      <div className={style.streamsHeaderLabel}>Bid diff</div>
      <div className={style.streamsHeaderLabel}>Index price</div>
      <div className={style.streamsHeaderLabel}>Ask diff</div>
      <div className={style.streamsHeaderLabel}>Ask price</div>
      <div className={style.streamsHeaderLabel}>Ask size</div>
    </div>
    <div className={style.streamsHeaderIndexContainer}>
      <div className={style.streamsHeaderIndexWrapper}>{children}</div>
    </div>
  </>
));
