import { Dispatch } from '@reduxjs/toolkit';

import { SocketMainEndpoint, SocketMainRes } from '~/types/socketTypes';
import { ChartReference } from '~/types/chartTypes';
import { TradesHistoryReference } from '~/types/tradesHistoryTypes';
import { WithdrawalsReference } from '~/types/withdrawalsTypes';
import { DepositsReference } from '~/types/depositsTypes';
import { UpdateOrderRes } from '~/store/Orders/types';
import { LoadTradesRes } from '~/store/PriceChart/types';
import { OrderAction } from '~/types/orderTypes';
import { sessionActions } from '~/store/Session/slice';
import { ordersActions } from '~/store/Orders/slice';
import { marketActions } from '~/store/Market/slice';
import { statsActions } from '~/store/Stats/slice';
import { balancesActions } from '~/store/Balances/slice';
import { tradeEstimationsActions } from '~/store/TradeEstimations/slice';
import { priceChartActions } from '~/store/PriceChart/slice';
import { addressesActions } from '~/store/Addresses/slice';
import { profitsLossesActions } from '~/store/ProfitsLosses/slice';
import { tradesHistoryActions } from '~/store/TradesHistory/slice';
import { withdrawalsActions } from '~/store/Withdrawals/slice';
import { depositsActions } from '~/store/Deposits/slice';
import { BalancesHistoryReference } from '~/types/balancesHistoryTypes';
import { balancesHistoryActions } from '~/store/BalancesHistory/slice';
import { feesHistoryActions } from '~/store/FeesHistory/slice';

import { Handlers } from './types';

const socketExternalHandler: Handlers = {
  [SocketMainEndpoint.AUTHORIZE]: [sessionActions.authorizeFulfilled, sessionActions.authorizeRejected],

  [SocketMainEndpoint.FATAL_ERROR]: [null, null],

  [SocketMainEndpoint.SESSION_CLOSED]: [statsActions.closeSessionFulfilled, null],
  [SocketMainEndpoint.SESSION_OPEN]: [statsActions.loadSessionDataFulfilled, statsActions.loadSessionDataRejected],
  [SocketMainEndpoint.CONNECTED]: [statsActions.loadVersionDataFulfilled, null],
  [SocketMainEndpoint.LOAD_TRADING_STATS]: [
    statsActions.loadTradingStatsFulfilled,
    statsActions.loadTradingStatsRejected
  ],

  [SocketMainEndpoint.LOAD_BALANCE]: [balancesActions.loadBalancesFulfilled, balancesActions.loadBalancesRejected],

  [SocketMainEndpoint.LOAD_ORDERS]: [ordersActions.loadSessionOrdersFulfilled, ordersActions.loadSessionOrdersRejected],
  [SocketMainEndpoint.LOAD_RECENT_ORDERS]: [ordersActions.loadOrdersFulfilled, ordersActions.loadOrdersRejected],
  [SocketMainEndpoint.CREATE_MARKET_ORDER]: [ordersActions.createOrderPreFulfilled, ordersActions.createOrderRejected],
  [SocketMainEndpoint.ORDER_UPDATE]: [null, null],

  [SocketMainEndpoint.LOAD_ESTIMATION_IM]: [
    tradeEstimationsActions.loadImEstimationFulfilled,
    tradeEstimationsActions.loadImEstimationRejected
  ],
  [SocketMainEndpoint.LOAD_MAX_TRADE_AMOUNT]: [null, null],
  [SocketMainEndpoint.LOAD_PRODUCT_FEE]: [
    tradeEstimationsActions.loadProductFeeFulfilled,
    tradeEstimationsActions.loadProductFeeRejected
  ],

  [SocketMainEndpoint.LOAD_SESSION_HEALTH]: [
    marketActions.loadSessionHealthFulfilled,
    marketActions.loadSessionHealthRejected
  ],
  [SocketMainEndpoint.SUBSCRIBE_MARKET_DATA]: [
    marketActions.subscribePricesFulfilled,
    marketActions.subscribePricesRejected
  ],
  [SocketMainEndpoint.MARKET_DATA]: [marketActions.updatePrices, null],
  [SocketMainEndpoint.UNSUBSCRIBE_MARKET_DATA]: [
    marketActions.unsubscribePricesFulfilled,
    marketActions.unsubscribePricesRejected
  ],

  [SocketMainEndpoint.SUBSCRIBE_DEALER_OFFERS]: [
    marketActions.subscribeDealersOffersFulfilled,
    marketActions.subscribeDealersOffersRejected
  ],
  [SocketMainEndpoint.DEALER_OFFERS]: [marketActions.updateDealersOffers, null],
  [SocketMainEndpoint.UNSUBSCRIBE_DEALER_OFFERS]: [
    marketActions.unsubscribeDealersOffersFulfilled,
    marketActions.unsubscribeDealersOffersRejected
  ],

  [SocketMainEndpoint.LOAD_HISTORICAL_PL]: [profitsLossesActions.loadFulfilled, profitsLossesActions.loadRejected],

  [SocketMainEndpoint.LOAD_ADDRESSES]: [
    addressesActions.loadAddressesFulfilled,
    addressesActions.loadAddressesRejected
  ],
  [SocketMainEndpoint.CREATE_ADDRESS]: [
    addressesActions.whitelistAddressFulfilled,
    addressesActions.whitelistAddressRejected
  ],
  [SocketMainEndpoint.REMOVE_ADDRESS]: [
    addressesActions.removeAddressFulfilled,
    addressesActions.removeAddressRejected
  ],

  [SocketMainEndpoint.LOAD_DEPOSIT_ADDRESS]: [
    depositsActions.loadDepositAddressFulfilled,
    depositsActions.loadDepositAddressRejected
  ],
  [SocketMainEndpoint.LOAD_DEPOSITS]: [depositsActions.loadDepositsFulfilled, depositsActions.loadDepositsRejected],
  [SocketMainEndpoint.UPDATE_DEPOSIT]: [depositsActions.updateDeposit, null],

  [SocketMainEndpoint.LOAD_WITHDRAWALS]: [
    withdrawalsActions.loadWithdrawalsFulfilled,
    withdrawalsActions.loadWithdrawalsRejected
  ],
  [SocketMainEndpoint.WITHDRAW_LIQUID]: [withdrawalsActions.withdrawFulfilled, withdrawalsActions.withdrawRejected],
  [SocketMainEndpoint.UPDATE_WITHDRAWAL]: [withdrawalsActions.updateWithdrawal, null],

  [SocketMainEndpoint.CANCEL_WITHDRAWAL]: [withdrawalsActions.updateWithdrawal, null],

  [SocketMainEndpoint.LOAD_TRADE_HISTORY]: [
    tradesHistoryActions.loadOrdersHistoryFulfilled,
    tradesHistoryActions.loadOrdersHistoryRejected
  ],
  [SocketMainEndpoint.LOAD_TRADE_SESSION_HISTORY]: [
    tradesHistoryActions.loadSessionsHistoryFulfilled,
    tradesHistoryActions.loadSessionsHistoryRejected
  ],
  [SocketMainEndpoint.LOAD_TRADE_DAYS_HISTORY]: [
    tradesHistoryActions.loadDaysHistoryFulfilled,
    tradesHistoryActions.loadDaysHistoryRejected
  ],

  [SocketMainEndpoint.LOAD_FEES_HISTORY]: [
    feesHistoryActions.loadFeesHistoryFulfilled,
    feesHistoryActions.loadFeesHistoryRejected
  ],

  [SocketMainEndpoint.LOAD_OHLC]: [null, null]
};

const updateOrderHandler = {
  [OrderAction.CREATED]: ordersActions.createOrderFulfilled,
  [OrderAction.UPDATED]: ordersActions.updateOrder,
  [OrderAction.REMOVED]: ordersActions.removeOrder
};

const priceChartHandler = {
  [ChartReference.ALL]: [priceChartActions.loadCandlesFulfilled, priceChartActions.loadCandlesRejected],
  [ChartReference.LAST_TWO]: [
    priceChartActions.loadLastTwoCandlesFulfilled,
    priceChartActions.loadLastTwoCandlesRejected
  ]
};

const tradeHistoryHandler = {
  [TradesHistoryReference.DOWNLOAD]: [
    tradesHistoryActions.loadCsvOrdersHistoryFulfilled,
    tradesHistoryActions.loadCsvOrdersHistoryRejected
  ]
};

const sessionHistoryHandler = {
  [BalancesHistoryReference.BALANCES]: [
    balancesHistoryActions.loadBalancesHistoryFulfilled,
    balancesHistoryActions.loadBalancesHistoryRejected
  ]
};

const withdrawalsHandler = {
  [WithdrawalsReference.DOWNLOAD]: [
    withdrawalsActions.loadWithdrawalsForDownloadFulfilled,
    withdrawalsActions.loadWithdrawalsForDownloadRejected
  ]
};

const depositsHandler = {
  [DepositsReference.DOWNLOAD]: [
    depositsActions.loadDepositsForDownloadFulfilled,
    depositsActions.loadDepositsForDownloadRejected
  ]
};

const maxTradeAmount = [
  tradeEstimationsActions.loadMaxTradeAmountFulfilled,
  tradeEstimationsActions.loadMaxTradeAmountRejected
];

export const handleMessage = (res: SocketMainRes, dispatch: Dispatch) => {
  const type = Object.keys(res)[0] as SocketMainEndpoint;
  const payload = res[type];

  if (type === SocketMainEndpoint.ORDER_UPDATE) {
    dispatch(updateOrderHandler[payload.action as OrderAction](payload as unknown as UpdateOrderRes));
    return;
  }

  if (type === SocketMainEndpoint.LOAD_OHLC) {
    const [success, failure] = priceChartHandler[payload.reference as ChartReference];

    if ((payload.errorMsg || payload.success === false) && failure) {
      dispatch(failure(payload.errorMsg as unknown as LoadTradesRes & string));
      return;
    }

    if (!payload.errorMsg && success) {
      dispatch(success(payload as unknown as LoadTradesRes & string));
      return;
    }
  }

  if (type === SocketMainEndpoint.LOAD_TRADE_HISTORY && payload.reference) {
    const [success, failure] = tradeHistoryHandler[payload.reference as TradesHistoryReference];

    if ((payload.errorMsg || payload.success === false) && failure) {
      dispatch(failure(payload.errorMsg as any));
      return;
    }

    if (!payload.errorMsg && success) {
      dispatch(success(payload as any));
      return;
    }
  }

  if (type === SocketMainEndpoint.LOAD_TRADE_SESSION_HISTORY && payload.reference) {
    const [success, failure] = sessionHistoryHandler[payload.reference as BalancesHistoryReference];

    if ((payload.errorMsg || payload.success === false) && failure) {
      dispatch(failure(payload.errorMsg as any));
      return;
    }

    if (!payload.errorMsg && success) {
      dispatch(success(payload as any));
      return;
    }
  }

  if (type === SocketMainEndpoint.LOAD_WITHDRAWALS && payload.reference) {
    const [success, failure] = withdrawalsHandler[payload.reference as WithdrawalsReference];

    if ((payload.errorMsg || payload.success === false) && failure) {
      dispatch(failure(payload.errorMsg as any));
      return;
    }

    if (!payload.errorMsg && success) {
      dispatch(success(payload as any));
      return;
    }
  }

  if (type === SocketMainEndpoint.LOAD_DEPOSITS && payload.reference) {
    const [success, failure] = depositsHandler[payload.reference as DepositsReference];

    if ((payload.errorMsg || payload.success === false) && failure) {
      dispatch(failure(payload.errorMsg as any));
      return;
    }

    if (!payload.errorMsg && success) {
      dispatch(success(payload as any));
      return;
    }
  }

  if (type === SocketMainEndpoint.LOAD_MAX_TRADE_AMOUNT) {
    const [success, failure] = maxTradeAmount;

    if ((payload.errorMsg || payload.success === false) && failure) {
      dispatch(failure(payload as any));
      return;
    }

    if (!payload.errorMsg && success) {
      dispatch(success(payload as any));
      return;
    }
  }

  if (!socketExternalHandler[type]) return;

  const [success, failure] = socketExternalHandler[type];

  if ((payload.errorMsg || payload.success === false) && failure) {
    if (type === SocketMainEndpoint.LOAD_HISTORICAL_PL) {
      dispatch(failure(payload));
    } else {
      dispatch(failure(payload.errorMsg));
    }

    return;
  }

  if (!payload.errorMsg && success) {
    dispatch(success(payload));
  }
};
