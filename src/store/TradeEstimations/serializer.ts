import { LoadEstimationRes, LoadMaxAmountRes, LoadProductFeeRes, TradeEstimationsState } from './types';

export const serializeImEstimation = (payload: LoadEstimationRes): TradeEstimationsState['imEstimation'] => ({
  expectedImReservation: Number(payload.expectedImReservation),
  feeAmount: Number(payload.feeAmount)
});

export const serializeMaxTradeAmount = (payload: LoadMaxAmountRes): number => Number(payload.qty);

export const serializeProductFee = (payload: LoadProductFeeRes): TradeEstimationsState['productFee'] => ({
  fee: Number(payload.fee),
  im: Number(payload.im)
});
