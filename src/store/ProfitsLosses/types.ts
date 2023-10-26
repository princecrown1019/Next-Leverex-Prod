import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';
import { ProductType } from '~/types/productTypes';
import { ProfitLossReference } from '~/types/profitLossTypes';

/*
 * Requests
 */

export type LoadPLReq = {
  productType: ProductType;
};

type LoadPLExtendedReq = LoadPLReq & {
  reference: ProfitLossReference;
  startTime: number;
  endTime: number;
};

/*
 * API Requests
 */

export type LoadPLSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_HISTORICAL_PL, LoadPLExtendedReq>;

export type ProfitLossSocketMainReqs = LoadPLSocketReq;

/*
 * API Responses
 */

export type LoadPLRes = {
  productType: ProductType;
  profitLoss: string;
  reference: ProfitLossReference;
};

export type LoadPLRejectedRes = {
  productType: ProductType;
  profitLoss: string;
  errorMsg: string;
  reference: ProfitLossReference;
};

/*
 * State
 */

export type ProfitsLossesState = {
  [ProfitLossReference.DAY]: number;
  [ProfitLossReference.WEEK]: number;
  [ProfitLossReference.MONTH]: number;
  [ProfitLossReference.YEAR]: number;
  [ProfitLossReference.ALL_TIME]: number;

  loading: { [K in ProfitLossReference]: boolean };
  error: { [K in ProfitLossReference]: null | string };
};
