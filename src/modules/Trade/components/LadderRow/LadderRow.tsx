import React, { DragEvent, FC, MouseEvent } from 'react';

import clsx from 'clsx';

import { Order } from '~/types/orderTypes';
import { ValueComponent } from '~/components/Value/ValueComponent';
import { ButtonComponent } from '~/components/Button/ButtonComponent';
import { ProductSide } from '~/types/productTypes';
import { TextGradientComponent } from '~/components/TextGradient/TextGradientComponent';
import { DealerOffer } from '~/types/marketTypes';

import style from './style.module.scss';

type Props = {
  ordersAsk?: Order<number>[];
  ordersBid?: Order<number>[];
  offerBid?: null | DealerOffer<number>;
  offerAsk?: null | DealerOffer<number>;
  price: number;
  mid: boolean;
  disabled?: boolean;
  askDisabled?: boolean;
  bidDisabled?: boolean;
  handleRowSideClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleRowQtyClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleRowPriceClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleDragStart: (event: DragEvent<HTMLButtonElement>) => void;
  handleDragOver: (event: DragEvent<HTMLButtonElement>) => void;
  handleDrop: (event: DragEvent<HTMLButtonElement>) => void;
};

export const LadderRow: FC<Props> = ({
  disabled,
  mid,
  offerAsk,
  offerBid,
  askDisabled,
  bidDisabled,
  ordersAsk,
  ordersBid,
  price,
  handleRowSideClick,
  handleRowQtyClick,
  handleRowPriceClick,
  handleDragOver,
  handleDragStart,
  handleDrop
}) => {
  const sideClasses = [style.ladderRowCell, style.ladderRowCellSide];
  const bidClasses = [
    style.ladderRowCellSideBids,
    Number(offerBid?.price) > price && style.ladderRowCellSideBidsFilled
  ];
  const askClasses = [
    style.ladderRowCellSideAsks,
    Number(offerAsk?.price) < price && style.ladderRowCellSideAsksFilled
  ];

  const bids = offerBid?.price === price ? offerBid?.volume : null;
  const asks = offerAsk?.price === price ? offerAsk?.volume : null;

  const bid = ordersBid?.reduce((acc, { quantity }) => acc + quantity, 0);
  const ask = ordersAsk?.reduce((acc, { quantity }) => acc + quantity, 0);

  return (
    <div className={clsx(style.ladderRow, mid && style.ladderRowMid)}>
      <ButtonComponent
        className={clsx(style.ladderRowCell, style.ladderRowCellQty, !!bid && style.ladderRowCellQtyBidActive)}
        disabled={!bid}
        data-side={ProductSide.BUY}
        data-price={price}
        data-id={ordersBid?.[0]?.id}
        draggable
        data-qty={bid}
        onClick={handleRowQtyClick}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {bid ? (
          <>
            <TextGradientComponent className={style.ladderRowCellQtyPrefix} positive visible>
              W
            </TextGradientComponent>
            <span className={style.ladderRowCellQtyValue}>
              <ValueComponent fix={4} abs>
                {bid}
              </ValueComponent>
            </span>
          </>
        ) : null}
      </ButtonComponent>

      <ButtonComponent
        className={clsx(...sideClasses, ...bidClasses, !!bids && style.ladderRowCellSideBidsActive)}
        disabled={disabled || bidDisabled}
        data-side={ProductSide.BUY}
        data-price={price}
        data-id={ordersBid?.[0]?.id}
        data-qty={bid}
        onClick={handleRowSideClick}
      >
        {bids ? <ValueComponent fix={4}>{bids}</ValueComponent> : ''}
      </ButtonComponent>

      <ButtonComponent className={style.ladderRowCell} withoutRipple onClick={handleRowPriceClick}>
        <ValueComponent fix={0}>{price}</ValueComponent>
      </ButtonComponent>

      <ButtonComponent
        className={clsx(...sideClasses, ...askClasses, !!asks && style.ladderRowCellSideAsksActive)}
        disabled={disabled || askDisabled}
        data-side={ProductSide.SELL}
        data-price={price}
        data-id={ordersAsk?.[0]?.id}
        data-qty={ask}
        onClick={handleRowSideClick}
      >
        {asks ? <ValueComponent fix={4}>{asks}</ValueComponent> : ''}
      </ButtonComponent>

      <ButtonComponent
        className={clsx(style.ladderRowCell, style.ladderRowCellQty, !!ask && style.ladderRowCellQtyAskActive)}
        disabled={!ask}
        data-side={ProductSide.SELL}
        data-price={price}
        data-id={ordersAsk?.[0]?.id}
        draggable
        data-qty={ask}
        onClick={handleRowQtyClick}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {ask ? (
          <>
            <TextGradientComponent className={style.ladderRowCellQtyPrefix} positive={false} visible>
              W
            </TextGradientComponent>
            <span className={style.ladderRowCellQtyValue}>
              <ValueComponent fix={4} abs>
                {ask}
              </ValueComponent>
            </span>
          </>
        ) : null}
      </ButtonComponent>
    </div>
  );
};
