import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { SocketMainEndpoint } from '~/types/socketTypes';
import { SessionSocketMainReqs } from '~/store/Session/types';
import { StatsSocketMainReqs } from '~/store/Stats/types';
import { BalancesSocketMainReqs } from '~/store/Balances/types';
import { OrdersSocketMainReqs } from '~/store/Orders/types';
import { MarketSocketMainReqs } from '~/store/Market/types';
import { TradeEstimationsSocketMainReqs } from '~/store/TradeEstimations/types';
import { PriceChartSocketMainReqs } from '~/store/PriceChart/types';
import { TradesHistoryMainReqs } from '~/store/TradesHistory/types';
import { DepositsSocketMainReqs } from '~/store/Deposits/types';
import { WithdrawalsSocketMainReqs } from '~/store/Withdrawals/types';

/*
 * API Requests
 */

export type SendReq =
  | SessionSocketMainReqs
  | BalancesSocketMainReqs
  | MarketSocketMainReqs
  | StatsSocketMainReqs
  | TradeEstimationsSocketMainReqs
  | OrdersSocketMainReqs
  | DepositsSocketMainReqs
  | WithdrawalsSocketMainReqs
  | PriceChartSocketMainReqs
  | TradesHistoryMainReqs;

/*
 * API Responses
 */

export type DisconnectedRes = {
  code: number;
  forceDisconnection: boolean;
  reason: string;
};

/*
 * Handlers
 */

type FulfilledHandler = ActionCreatorWithPayload<any>;
type RejectedHandler = ActionCreatorWithPayload<any | string>;
export type Handlers = {
  [K in SocketMainEndpoint]: [null | FulfilledHandler, null | RejectedHandler];
};

/*
 * State
 */

export type SocketMainState = {
  connected: boolean;

  loading: boolean;

  error: null | string;
};
