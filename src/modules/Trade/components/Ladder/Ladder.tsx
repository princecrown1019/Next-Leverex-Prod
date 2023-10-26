import React, { FC, RefObject, MouseEvent, DragEvent, useMemo } from 'react';

import { Order } from '~/types/orderTypes';
import { DealerOffer } from '~/types/marketTypes';
import { LadderHead } from '~/modules/Trade/components/LadderHead/LadderHead';
import { LadderRow } from '~/modules/Trade/components/LadderRow/LadderRow';

import style from './style.module.scss';

type Props = {
  containerRef: RefObject<HTMLDivElement>;
  ordersAsk: Partial<Record<number, Order<number>[]>>;
  ordersBid: Partial<Record<number, Order<number>[]>>;
  offerAsk: null | DealerOffer<number>;
  offerBid: null | DealerOffer<number>;
  spread: number;
  price: number;
  disabled?: boolean;
  handleRowSideClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleRowQtyClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleRowPriceClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleDragStart: (event: DragEvent<HTMLButtonElement>) => void;
  handleDragOver: (event: DragEvent<HTMLButtonElement>) => void;
  handleDrop: (event: DragEvent<HTMLButtonElement>) => void;
};

export const Ladder: FC<Props> = ({
  containerRef,
  ordersAsk,
  ordersBid,
  offerAsk,
  offerBid,
  price,
  spread,
  disabled,
  handleRowSideClick,
  handleRowQtyClick,
  handleRowPriceClick,
  handleDragOver,
  handleDragStart,
  handleDrop
}) => {
  const prices = useMemo(() => {
    if (!containerRef.current || !price) return [];

    const maxPrice = price + 15 * spread;

    return Array.from({ length: 30 }).map((_, idx) => maxPrice - spread * (idx + 1));
  }, [price, spread, containerRef.current]);

  return (
    <div className={style.ladder} ref={containerRef}>
      <LadderHead />
      <div className={style.ladderBody}>
        {prices.map((value) => (
          <LadderRow
            key={value}
            disabled={disabled}
            offerBid={offerBid}
            offerAsk={offerAsk}
            price={value}
            mid={value === price}
            ordersAsk={ordersAsk[value]}
            ordersBid={ordersBid[value]}
            handleRowSideClick={handleRowSideClick}
            handleRowQtyClick={handleRowQtyClick}
            handleRowPriceClick={handleRowPriceClick}
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};
