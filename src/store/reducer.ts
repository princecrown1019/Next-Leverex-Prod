import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';

import { toastsReducer } from '~/store/Toasts/slice';
import { socketAuthReducer } from '~/store/SocketAuth/slice';
import { socketMainReducer, socketMainActions } from '~/store/SocketMain/slice';
import { statsReducer } from '~/store/Stats/slice';
import { sessionReducer, initialState as sessionInitialState, sessionActions } from '~/store/Session/slice';
import { balancesReducer } from '~/store/Balances/slice';
import { marketReducer } from '~/store/Market/slice';
import { tradeEstimationsReducer } from '~/store/TradeEstimations/slice';
import { ordersReducer } from '~/store/Orders/slice';
import { tradesHistoryReducer } from '~/store/TradesHistory/slice';
import { profitsLossesReducer } from '~/store/ProfitsLosses/slice';
import { addressesReducer } from '~/store/Addresses/slice';
import { priceChartReducer } from '~/store/PriceChart/slice';
import { deviceKeysReducer } from '~/store/DeviceKeys/slice';
import { withdrawalsReducer } from '~/store/Withdrawals/slice';
import { depositsReducer } from '~/store/Deposits/slice';
import { notificationsReducer, initialState as notificationsInitialState } from '~/store/Notifications/slice';
import { balancesHistoryReducer } from '~/store/BalancesHistory/slice';
import { feesHistoryReducer } from '~/store/FeesHistory/slice';

import { AppState } from './types';

const appReducer = combineReducers<AppState | Pick<AppState, 'socketAuth' | 'socketMain' | 'session'>>({
  toasts: toastsReducer,

  socketAuth: socketAuthReducer,
  socketMain: socketMainReducer,

  stats: statsReducer,
  session: sessionReducer,
  balances: balancesReducer,
  market: marketReducer,
  tradeEstimations: tradeEstimationsReducer,
  orders: ordersReducer,
  tradesHistory: tradesHistoryReducer,
  profitsLosses: profitsLossesReducer,
  addresses: addressesReducer,
  priceChart: priceChartReducer,
  deviceKeys: deviceKeysReducer,
  withdrawals: withdrawalsReducer,
  deposits: depositsReducer,
  notifications: notificationsReducer,
  balancesHistory: balancesHistoryReducer,
  feesHistory: feesHistoryReducer
});

export const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  if (state) {
    const { socketAuth, socketMain, session, market, notifications, priceChart, stats } = state;

    if (action.type === sessionActions.logout.type || action.type === socketMainActions.disconnectFulfilled.type) {
      return appReducer(
        {
          socketAuth,
          socketMain,
          stats,
          priceChart,
          market,
          session: { ...sessionInitialState, token: session.token },
          notifications: { ...notificationsInitialState, allowed: notifications.allowed }
        },
        action
      );
    }
  }

  return appReducer(state, action);
};
