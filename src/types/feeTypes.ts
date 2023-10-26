export type Fee<T> = {
  fee: T;
  ccy: string;
  im: T;
  tradeRef: string;
  positionSize: number;
  timestamp: number;
  side: 'sell' | 'buy';
};
