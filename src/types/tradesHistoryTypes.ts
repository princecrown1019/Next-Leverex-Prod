import { ProductType } from '~/types/productTypes';
import { Order, RolloverType } from '~/types/orderTypes';

export enum TradesHistoryReference {
  DOWNLOAD = 'download'
}

export type TradeSession<T> = {
  productType: ProductType;
  id: string;
  fee: T;
  pnl: T;
  volume: T;
  open: T;
  close: T;
  nbTradesBuy: number;
  nbTradesSell: number;
  nbRolloverTrades?: number;
  timeStart: number;
  timeEnd: number;
  rolloverType: RolloverType;
  hasLiquidation: boolean;
  hasDefault: boolean;

  nbTrades: number;
  clientIds?: string[];
  clientHasSells: boolean;
  clientHasBuys: boolean;
};

export type TradeDay<T> = Omit<TradeSession<T>, 'id' | 'clientIds'> & {
  sessions: TradeSession<T>[];
  orders: Order<T>[];
  date: string;
};
