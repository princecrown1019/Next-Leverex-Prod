import React, { FC } from 'react';

import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  className?: string;
};

export const LadderHead: FC<Props> = ({ className }) => {
  return (
    <div className={clsx(style.ladderHead, className)}>
      <div className={style.ladderHeadCell}>Buy</div>
      <div className={clsx(style.ladderHeadCell, style.ladderHeadCellSide)}>Bids</div>
      <div className={style.ladderHeadCell}>Price</div>
      <div className={clsx(style.ladderHeadCell, style.ladderHeadCellSide)}>Asks</div>
      <div className={style.ladderHeadCell}>Sell</div>
    </div>
  );
};
