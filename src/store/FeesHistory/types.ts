import { ProductType } from '~/types/productTypes';
import { FeesReference } from '~/types/feesTypes';
import { SocketMainEndpoint, SocketMainReq } from '~/types/socketTypes';

/*
 * Requests
 */

export type LoadFeesReq = {
  productType?: ProductType;
  reference?: FeesReference;
  startTime?: number;
  endTime?: number;
};

/*
 * API Requests
 */

export type LoadFeesSocketReq = SocketMainReq<SocketMainEndpoint.LOAD_FEES_HISTORY, Required<LoadFeesReq>>;

export type FeesHistoryMainReqs = LoadFeesSocketReq;

/*
 * API Responses
 */

export type LoadFeesRes = {
  productType: ProductType;
  reference: FeesReference;
  fees: string;
  errorMsg: null | string;
};

/*
 * State
 */

type StateKeys = FeesReference;

export type FeesHistoryState = {
  [FeesReference.TIME_RANGE]:
    | null
    | {
        [P in ProductType]: number;
      };
  [FeesReference.ALL_TIME]:
    | null
    | {
        [P in ProductType]: number;
      };

  loading: { [K in StateKeys]: boolean };
  error: { [K in StateKeys]: null | string };
};
