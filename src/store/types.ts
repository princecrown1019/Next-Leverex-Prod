import { ThunkAction, Action, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

import { ToastsState } from '~/store/Toasts/types';
import { StatsState } from '~/store/Stats/types';
import { SocketAuthState } from '~/store/SocketAuth/types';
import { SocketMainState } from '~/store/SocketMain/types';
import { SessionState } from '~/store/Session/types';
import { BalancesState } from '~/store/Balances/types';
import { MarketState } from '~/store/Market/types';
import { TradeEstimationsState } from '~/store/TradeEstimations/types';
import { OrdersState } from '~/store/Orders/types';
import { ProfitsLossesState } from '~/store/ProfitsLosses/types';
import { AddressesState } from '~/store/Addresses/types';
import { PriceChartState } from '~/store/PriceChart/types';
import { DeviceKeysState } from '~/store/DeviceKeys/types';
import { TradesHistoryState } from '~/store/TradesHistory/types';
import { WithdrawalsState } from '~/store/Withdrawals/types';
import { DepositsState } from '~/store/Deposits/types';
import { NotificationsState } from '~/store/Notifications/types';
import { BalancesHistoryState } from '~/store/BalancesHistory/types';
import { FeesHistoryState } from '~/store/FeesHistory/types';

export type AppState = {
  toasts: ToastsState;

  socketAuth: SocketAuthState;
  socketMain: SocketMainState;

  stats: StatsState;
  session: SessionState;
  balances: BalancesState;
  market: MarketState;
  tradeEstimations: TradeEstimationsState;
  orders: OrdersState;
  tradesHistory: TradesHistoryState;
  profitsLosses: ProfitsLossesState;
  addresses: AddressesState;
  priceChart: PriceChartState;
  deviceKeys: DeviceKeysState;
  withdrawals: WithdrawalsState;
  deposits: DepositsState;
  notifications: NotificationsState;
  balancesHistory: BalancesHistoryState;
  feesHistory: FeesHistoryState;
};

export type AppThunkAction = ThunkAction<void, AppState, unknown, Action>;
export type AppThunkDispatch = ThunkDispatch<AppState, null, AnyAction>;

declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  type DefaultRootState = AppState;
}
