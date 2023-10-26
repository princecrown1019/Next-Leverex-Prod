import { PRODUCT_CURRENCIES, PRODUCT_SIDES_NAME, PRODUCT_TICKERS } from '~/constants/productConstants';
import { Order, OrderStatus, RolloverType } from '~/types/orderTypes';
import { TradeDay, TradeSession } from '~/types/tradesHistoryTypes';
import { ProductSide } from '~/types/productTypes';
import { Ticker } from '~/types/currencyTypes';
import { serializeOrder } from '~/store/Orders/serializer';
import { toMilliseconds, toUTCStringDate, toUTCStringTime } from '~/services/DateFormat/dateFormatService';
import { separateAndFix } from '~/services/NumberFormat/numberFormatService';
import { makeItemsUnique } from '~/services/Unique/uniqueService';
import { prepareForCsv } from '~/services/Csv/csvService';
import { setDateRangeValues } from '~/services/DateRanges/dateRangesService';

export const serializeSession = (session: TradeSession<string>): TradeSession<number> => ({
  ...session,
  volume: Number(session.volume),
  close: Number(session.close),
  open: Number(session.open),
  pnl: Number(session.pnl),
  fee: Number(session.fee),
  nbTrades: session.nbTradesBuy + session.nbTradesSell + Number(session.nbRolloverTrades || 0),
  timeStart: toMilliseconds(session.timeStart),
  timeEnd: session.timeEnd ? toMilliseconds(session.timeEnd) : 0,

  clientHasBuys: session.nbTradesBuy > 0,
  clientHasSells: session.nbTradesSell > 0
});

export const serializeSessions = (
  oldSessions: TradeSession<number>[],
  sessions: TradeSession<string>[]
): TradeSession<number>[] => {
  const serializedSessions = sessions.map((session) => serializeSession(session));

  return makeItemsUnique([...oldSessions, ...serializedSessions], 'id').sort(
    (prev, curr) => curr.timeStart - prev.timeStart
  );
};

export const serializeOrders = (oldOrders: Order<number>[], orders: Order<string>[]) => {
  const serializedOrders = orders.map((order) => serializeOrder(order));

  return makeItemsUnique([...oldOrders, ...serializedOrders], 'id').sort(
    (prev, curr) => curr.timestamp - prev.timestamp
  );
};

export const serializeDay = (day: TradeSession<string>): TradeDay<number> => {
  const { timeEnd, ...dayValues } = serializeSession(day);

  return {
    ...dayValues,
    orders: [],
    sessions: [],
    date: toUTCStringDate(toMilliseconds(day.timeStart)),
    timeEnd: !timeEnd ? setDateRangeValues(new Date(), false).getTime() : timeEnd
  };
};

export const serializeDays = (days: TradeSession<string>[]): TradeDay<number>[] => {
  return days.map((day) => serializeDay(day));
};

// const serializeRolloverSessions = (sessions: TradeSession<number>[]) => {
//   // eslint-disable-next-line unicorn/no-array-reduce
//   return sessions.reduce((acc, session) => ({
//     ...acc,
//     clientIds: [...(acc.clientIds || [acc.id]), session.id],
//     open: session.open,
//     volume: acc.volume + session?.volume,
//     timeStart: session?.timeStart,
//     nbTrades: acc.nbTrades + session?.nbTrades,
//     pnl: acc.pnl + session?.pnl
//   }));
// };

const serializeDaySessions = (timeStart: number, timeEnd: number, sessions: TradeSession<number>[]) => {
  const daySessions = sessions.filter(
    (session) => session.close && session.timeStart >= timeStart && session.timeEnd <= (timeEnd || Date.now())
  );

  if (!daySessions.length) return [];

  // const result: TradeSession<number>[] = [];
  // let rollovers: TradeSession<number>[] = [];
  //
  // for (const [idx, session] of daySessions.entries()) {
  //   const prevSession = daySessions[idx + 1] || null;
  //
  //   if (prevSession?.rolloverType === RolloverType.ROLLOVER && session.rolloverType === RolloverType.ROLLOVER) {
  //     rollovers.push(session);
  //   } else if (session.rolloverType !== RolloverType.ROLLOVER) {
  //     result.push(session);
  //   } else {
  //     result.push(serializeRolloverSessions([...rollovers, session]));
  //     rollovers = [];
  //   }
  // }

  // return result;
  return daySessions;
};

const serializeDayOrders = (timeStart: number, timeEnd: number, orders: Order<number>[]) => {
  return orders.filter(
    (order) =>
      order.status !== OrderStatus.PENDING && order.timestamp >= timeStart && order.timestamp <= (timeEnd || Date.now())
  );
};

export const serializeDaysSessionOrdersHistory = (
  days: TradeDay<number>[],
  nextCutOffAt: number,
  sessions: TradeSession<number>[],
  orders: Order<number>[]
): TradeDay<number>[] => {
  return days.map((day) => ({
    ...day,
    pnl: day.pnl,
    sessions: serializeDaySessions(day.timeStart, day.timeEnd || nextCutOffAt, sessions),
    orders: serializeDayOrders(day.timeStart, day.timeEnd || nextCutOffAt, orders)
  }));
};

export const serializeOrdersCSV = (orders: Order<number>[]) => {
  const header = [
    'Date',
    'Time',
    'Side',
    `Volume (${Ticker.BTC})`,
    'Open',
    'Close',
    'Fee',
    'Realized P/L',
    'Defaulted',
    'Liquidated'
  ];

  const body = orders.map((order) => [
    `${toUTCStringDate(order.timestamp)}`,
    `${toUTCStringTime(order.timestamp)}`,
    PRODUCT_SIDES_NAME[order.side],
    separateAndFix(order.quantity, 8),
    separateAndFix(order.price, 2),
    order.cutOffPrice ? separateAndFix(order.cutOffPrice, 2) : '',
    order.rolloverType === RolloverType.ROLLOVER ? 'Roll' : separateAndFix(order.fee, 2),
    separateAndFix(order.tradePnl, 2),
    order.clientIsDefault ? '*' : '',
    order.clientIsLiquidation ? '*' : ''
  ]);

  return prepareForCsv(header, body);
};

export const serializeOrdersPDF = (orders: Order<number>[]) => {
  const head = ['Date (UTC)', 'Side', `Inst.`, 'Quantity', 'Open', 'Close', 'Agst.', 'Fee', 'PNL', 'Status'];
  const body: string[][] = [];

  const getStatus = ({ clientIsLiquidation, clientIsDefault, status }: Order<number>) => {
    if (clientIsDefault) return 'Default';
    if (clientIsLiquidation) return 'Liquidation';

    if (status === OrderStatus.PENDING) return 'Open';
    if (status === OrderStatus.VOID) return 'Void';

    return 'Settled';
  };

  const getRow = (order: Order<number>) => [
    `${toUTCStringDate(order.timestamp)} ${toUTCStringTime(order.timestamp)}`,
    PRODUCT_SIDES_NAME[order.side],
    PRODUCT_TICKERS[order.productType],
    separateAndFix(Math.abs(order.quantity), 8),
    separateAndFix(order.price, 2),
    order.cutOffPrice ? separateAndFix(order.cutOffPrice, 2) : '-',
    PRODUCT_CURRENCIES[order.productType],
    separateAndFix(order.fee, 2),
    separateAndFix(order.tradePnl, 2),
    getStatus(order),
    order.rolloverType === RolloverType.ROLLOVER ? '' : 'not rollover'
  ];

  if (!orders.length) {
    body.push(['No orders were placed']);
  } else {
    for (const order of orders) {
      if (order.clientIsLiquidation || order.clientIsDefault) {
        const diff = order.quantity - order.referenceExposure;
        const side = diff > 0 ? ProductSide.BUY : ProductSide.SELL;

        body.push(
          getRow({ ...order, status: OrderStatus.FILLED, clientIsDefault: false, clientIsLiquidation: false }),
          [
            `${toUTCStringDate(order.timestamp)} ${toUTCStringTime(order.timestamp)}`,
            PRODUCT_SIDES_NAME[side],
            PRODUCT_TICKERS[order.productType],
            separateAndFix(Math.abs(diff), 8),
            separateAndFix(order.price, 2),
            order.cutOffPrice ? separateAndFix(order.cutOffPrice, 2) : '-',
            PRODUCT_CURRENCIES[order.productType],
            separateAndFix(order.fee, 2),
            separateAndFix(0, 2),
            getStatus(order)
          ]
        );
      } else {
        body.push(getRow(order));
      }
    }
  }

  return { head, body };
};
