import { ProductSide } from '~/types/productTypes';
import { Order, OrderStatus, RolloverType } from '~/types/orderTypes';
import { toMilliseconds } from '~/services/DateFormat/dateFormatService';
import { fixDecimals } from '~/services/NumberFormat/numberFormatService';

export const serializeOrder = (order: Order<string>): Order<number> => {
  const numericQuantity = Number(order.quantity);
  const quantity = order.side === ProductSide.SELL ? -numericQuantity : numericQuantity;

  return {
    ...order,
    quantity,
    cutOffPrice: Number(order.cutOffPrice),
    price: Number(order.price),
    tradeIm: Number(order.tradeIm),
    tradePnl: Number(order.tradePnl),
    fee: Number(order.fee),
    referenceExposure: Number(order.referenceExposure),
    timestamp: toMilliseconds(order.timestamp),

    clientIsDefault: order.rolloverType === RolloverType.DEFAULT,
    clientIsLiquidation: order.rolloverType === RolloverType.LIQUIDATION
  };
};

export const serializeOrders = (orders: Order<string>[]) => {
  return orders.map((order) => serializeOrder(order)).sort((prev, curr) => curr.timestamp - prev.timestamp);
};

export const serializeOrdersProfitLoss = (orders: Order<number>[], sessionIm: number, liveCutOffPrice: number) => {
  return orders.map((order) => {
    if (order.status !== OrderStatus.PENDING || !liveCutOffPrice) return order;

    let priceDelta = Math.abs(liveCutOffPrice - order.price);
    priceDelta = Math.min(priceDelta, sessionIm);

    if (
      (liveCutOffPrice < order.price && order.side === ProductSide.BUY) ||
      (liveCutOffPrice > order.price && order.side === ProductSide.SELL)
    ) {
      priceDelta *= -1;
    }

    const pnl = priceDelta * Math.abs(order.quantity);

    return { ...order, tradePnl: Number(fixDecimals(pnl, 2)) };
  });
};
