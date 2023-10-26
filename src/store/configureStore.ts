import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createSocketMiddleware } from 'redux-ws-middleware';
import { createLogger } from 'redux-logger';

import { DEV_ENV, PROD, TEST } from '~/constants/configConstants';
import { SessionState } from '~/store/Session/types';
import { OrdersState } from '~/store/Orders/types';
import { initialState as sessionInitialState } from '~/store/Session/slice';
import { initialState as notificationsInitialState } from '~/store/Notifications/slice';
import { initialState as ordersInitialState } from '~/store/Orders/slice';
import { createAuthSocketMiddleware } from '~/store/SocketAuth/middleware';
import { createSessionMiddleware } from '~/store/Session/middleware';
import { createSocketMainMiddleware } from '~/store/SocketMain/middleware';
import { createMarketMiddleware } from '~/store/Market/middleware';
import { createBalancesMiddleware } from '~/store/Balances/middleware';
import { createToastsMiddleware } from '~/store/Toasts/middleware';
import { createOrdersMiddleware } from '~/store/Orders/middleware';
import { createAddressesMiddleware } from '~/store/Addresses/middleware';
import { createTradeEstimationsMiddleware } from '~/store/TradeEstimations/middleware';
import { createStatsMiddleware } from '~/store/Stats/middleware';
import { socketAuthOptions } from '~/store/SocketAuth/options';
import { socketAuthActions } from '~/store/SocketAuth/slice';
import { socketMainOptions } from '~/store/SocketMain/options';
import { marketActions } from '~/store/Market/slice';
import { createDeviceKeysMiddleware } from '~/store/DeviceKeys/middleware';
import { createTradesHistoryMiddleware } from '~/store/TradesHistory/middleware';
import { createWithdrawalsMiddleware } from '~/store/Withdrawals/middleware';
import { createDepositsMiddleware } from '~/store/Deposits/middleware';
import { NotificationsState } from '~/store/Notifications/types';
import { createProfitLossMiddleware } from '~/store/ProfitsLosses/middleware';

import { AppState } from './types';
import { rootReducer } from './reducer';

const ignoredLoggerActionTypes = new Set([
  socketAuthActions.send.type,
  marketActions.updatePrices.type,
  marketActions.updateDealersOffers.type
]);

const sessionTransform = createTransform<SessionState, SessionState>(
  (state) => ({ ...sessionInitialState, token: state.token, lastAuthorizeTime: state.lastAuthorizeTime }),
  null,
  { whitelist: ['session'] }
);

const notificationsTransform = createTransform<NotificationsState, NotificationsState>(
  (state) => ({ ...notificationsInitialState, allowed: state.allowed }),
  null,
  { whitelist: ['notifications'] }
);

const ordersTransform = createTransform<OrdersState, OrdersState>(
  (state) => ({
    ...ordersInitialState,
    workingOrders: state.workingOrders,
    loadingWorkingIds: state.loadingWorkingIds
  }),
  null,
  { whitelist: ['orders'] }
);

const persistConfig: PersistConfig<AppState> = {
  version: 1,
  key: 'leverex-root',
  storage,
  whitelist: ['session', 'notifications', 'orders'],
  stateReconciler: autoMergeLevel2,
  transforms: [sessionTransform, notificationsTransform, ordersTransform]
};

const persistedReducer = persistReducer<AppState>(persistConfig, rootReducer);

const createStore = (preloadedState?: Partial<AppState>) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    devTools: DEV_ENV,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({ serializableCheck: false });

      // For avoidance displaying logs in the terminal.
      // if (!TEST && !PROD && typeof window !== 'undefined') {
      // TODO: Add "!PROD" back to the "if"
      if (!TEST && typeof window !== 'undefined') {
        const loggerMiddleware = createLogger({
          collapsed: true,
          predicate: (_, action) => !ignoredLoggerActionTypes.has(action.type)
        });

        middleware.push(loggerMiddleware);
      }

      middleware.push(
        createAuthSocketMiddleware(),
        createSocketMiddleware(socketAuthOptions),
        createSocketMiddleware(socketMainOptions),
        createSocketMainMiddleware(),
        createSessionMiddleware(),
        createToastsMiddleware(),
        createMarketMiddleware(),
        createStatsMiddleware(),
        createBalancesMiddleware(),
        createOrdersMiddleware(),
        createTradesHistoryMiddleware(),
        createAddressesMiddleware(),
        createWithdrawalsMiddleware(),
        createDepositsMiddleware(),
        createTradeEstimationsMiddleware(),
        createDeviceKeysMiddleware(),
        createProfitLossMiddleware()
      );

      if (TEST) {
        middleware.splice(3, 2);
      }

      return middleware;
    }
  });

  // Enable Webpack hot module replacement for reducers
  if (module.hot && !PROD) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
  }

  const persistor = persistStore(store);

  return { store, persistor };
};

export const { store, persistor } = createStore();
export const createTestStore = (preloadedState?: Partial<AppState>) => createStore(preloadedState).store;
