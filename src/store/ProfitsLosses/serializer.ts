import { fixDecimals } from '~/services/NumberFormat/numberFormatService';

export const serializeProfitLoss = (value: string): number => Number(fixDecimals(value, 2));
