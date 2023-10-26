/*
 * Common
 */

export enum SocketCloseStatus {
  WITH_RECONNECT = 1000,
  WITHOUT_RECONNECT = 4999
}

/*
 * Auth Socket API
 */

export enum SocketAuthEndpoint {
  REGISTER_BASIC = 'mobile_signup',
  CONFIRM_BASIC = 'confirm_code',

  LOG_IN_BASIC = 'new',

  REGISTER = 'signup_init',
  REGISTER_STATUS = 'signup_status',
  REGISTER_COMPLETE = 'signup_complete',

  CORPORATE_REGISTER = 'corporate_signup_init',
  CORPORATE_REGISTER_STATUS = 'corporate_signup_status',
  CORPORATE_REGISTER_COMPLETE = 'corporate_sign_complete',

  LOGIN = 'login_init',
  LOGIN_STATUS = 'login_status',
  LOGIN_COMPLETE = 'login_complete',

  REFRESH_SESSION = 'renew',

  CANCEL_REQUEST = 'cancel',

  LOAD_DEVICE_KEYS = 'list_service_keys',
  REVOKE_DEVICE_KEY = 'revoke_service_key'
}

export type SocketAuthReq<M extends SocketAuthEndpoint = SocketAuthEndpoint, A = Record<string, unknown>> = {
  api: string;
  method: M;
  messageId: string;
  args: A;
};

export type SocketAuthRes<M extends SocketAuthEndpoint = SocketAuthEndpoint, D = Record<string, unknown>> = {
  api: string;
  method: M;
  messageId: string;
  error: null | number | string;
  data: D;
};

/*
 * Main Socket API
 */

export enum SocketMainEndpoint {
  AUTHORIZE = 'authorize',

  FATAL_ERROR = 'fatalError',

  LOAD_TRADING_STATS = 'tradingStats',
  SESSION_OPEN = 'sessionOpen',
  SESSION_CLOSED = 'sessionClosed',
  LOAD_SESSION_HEALTH = 'sessionHealth',
  CONNECTED = 'connected',

  LOAD_BALANCE = 'loadBalance',

  LOAD_ORDERS = 'loadOrders',
  LOAD_RECENT_ORDERS = 'loadRecentOrders',
  CREATE_MARKET_ORDER = 'marketOrder',
  ORDER_UPDATE = 'orderUpdate',
  LOAD_ESTIMATION_IM = 'estimateIm',
  LOAD_PRODUCT_FEE = 'productFee',
  LOAD_MAX_TRADE_AMOUNT = 'maxTradeAmount',
  LOAD_HISTORICAL_PL = 'historicalProfitLoss',

  SUBSCRIBE_MARKET_DATA = 'subscribe',
  MARKET_DATA = 'marketData',
  UNSUBSCRIBE_MARKET_DATA = 'unsubscribe',

  SUBSCRIBE_DEALER_OFFERS = 'subscribeDealerOffers',
  DEALER_OFFERS = 'dealerOffers',
  UNSUBSCRIBE_DEALER_OFFERS = 'unsubscribeDealerOffers',

  LOAD_ADDRESSES = 'loadAddresses',
  CREATE_ADDRESS = 'submitAddress',
  REMOVE_ADDRESS = 'revokeAddress',

  LOAD_DEPOSITS = 'loadDeposits',
  UPDATE_DEPOSIT = 'updateDeposit',
  LOAD_DEPOSIT_ADDRESS = 'loadDepositAddress',

  LOAD_WITHDRAWALS = 'loadWithdrawals',
  UPDATE_WITHDRAWAL = 'updateWithdrawal',
  WITHDRAW_LIQUID = 'withdrawLiquid',
  CANCEL_WITHDRAWAL = 'cancelWithdraw',

  LOAD_TRADE_HISTORY = 'tradeHistory',
  LOAD_TRADE_SESSION_HISTORY = 'sessionHistory',
  LOAD_TRADE_DAYS_HISTORY = 'tradingDaysHistory',

  LOAD_FEES_HISTORY = 'feesHistory',

  LOAD_OHLC = 'ohlc'
}

export type SocketMainReq<M extends SocketMainEndpoint = SocketMainEndpoint, D = Record<string, unknown>> = {
  [method in M]: D;
};

export type SocketMainRes<M extends SocketMainEndpoint = SocketMainEndpoint, D = Record<string, unknown>> = {
  [method in M]: D & {
    success: boolean;
    errorMsg: string;
  };
};
