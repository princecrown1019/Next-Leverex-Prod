import { PRODUCT_CURRENCIES, PRODUCT_TICKERS } from '~/constants/productConstants';
import { Order, RolloverType } from '~/types/orderTypes';
import { ProductType } from '~/types/productTypes';
import { ToastType } from '~/types/toastTypes';
import { Deposit } from '~/types/depositsTypes';
import { Withdrawal } from '~/types/withdrawalsTypes';
import { AppThunkAction } from '~/store/types';
import { selectLoggedIn } from '~/store/Session/selectors';
import { toastsActions } from '~/store/Toasts/slice';
import { serializeDeposit } from '~/store/Deposits/serializer';
import { serializeOrder } from '~/store/Orders/serializer';
import { selectDynamicProductSessionProfitLoss } from '~/store/ProfitsLosses/selectors';
import { selectDynamicProductNetExposure, selectDynamicProductSessionOrders } from '~/store/Orders/selectors';
import { sendDesktopNotification } from '~/services/DesktopNotifications/desktopNotificationsService';
import { separateAndFix } from '~/services/NumberFormat/numberFormatService';
import { toProductPair } from '~/services/Product/productService';
import { selectNotificationsAllowed } from '~/store/Notifications/selectors';
import { Address } from '~/types/addressTypes';

import { CreateReq } from './types';

const notify = (payload: CreateReq): AppThunkAction => {
  const { toast, notification } = payload;

  return (dispatch, getState) => {
    const state = getState();

    const loggedIn = selectLoggedIn(state);
    if (!loggedIn) return;

    const notificationsAllowed = selectNotificationsAllowed(state);

    if (notificationsAllowed) {
      sendDesktopNotification(notification.title, notification.body, () => {
        dispatch(toastsActions.create(toast));
      });
    } else {
      dispatch(toastsActions.create(toast));
    }
  };
};

export const rollNotification = (productType: ProductType): AppThunkAction => {
  return (dispatch, getState) => {
    const state = getState();

    const sessionOrders = selectDynamicProductSessionOrders(state, productType);
    if (!sessionOrders.length) return;

    const pnl = selectDynamicProductSessionProfitLoss(state, productType);
    const exposure = selectDynamicProductNetExposure(state, productType);
    const currency = PRODUCT_CURRENCIES[productType];
    const productPair = toProductPair(PRODUCT_TICKERS[productType], currency);

    const formattedPnl = separateAndFix(pnl);
    const formattedExposure = separateAndFix(exposure, 8);

    const toast = { type: ToastType.INFO, message: `Session roll ${productPair}` };
    const notification = {
      title: `Session roll ${productPair}`,
      body: `Profit/Loss: ${formattedPnl} ${currency}\nExposure: ${formattedExposure}`
    };

    dispatch(notify({ toast, notification }));
  };
};

export const tradeNotification = (order: Order<string>): AppThunkAction => {
  const { productType, quantity, referenceExposure, rolloverType, price } = serializeOrder(order);

  const ticker = PRODUCT_TICKERS[productType];
  const currency = PRODUCT_CURRENCIES[productType];
  const exposure = rolloverType !== RolloverType.NOT_ROLLOVER ? quantity : referenceExposure;

  const formattedQty = separateAndFix(quantity, 8);
  const formattedPrice = separateAndFix(price, 2);
  const formattedExposure = separateAndFix(exposure, 8);

  const toast = {
    type: ToastType.SUCCESS,
    message: `Market order of ${formattedQty} ${ticker} has been successfully executed at ${formattedPrice} ${currency}`
  };
  const notification = {
    title: `Trade notification (${ticker})`,
    body: `Trade: ${formattedQty}\nExposure: ${formattedExposure}`
  };

  return (dispatch) => {
    dispatch(notify({ toast, notification }));
  };
};

export const liquidationNotification = (order: Order<string>): AppThunkAction => {
  const { productType, quantity, referenceExposure } = serializeOrder(order);

  const ticker = PRODUCT_TICKERS[productType];

  const formattedLiquidation = separateAndFix(quantity - Number(referenceExposure), 8);

  const toast = {
    type: ToastType.WARNING,
    message: `Liquidation: ${formattedLiquidation} ${ticker}`
  };
  const notification = {
    title: `Liquidation notification (${ticker})`,
    body: `Liquidation: ${formattedLiquidation}`
  };

  return (dispatch) => {
    dispatch(notify({ toast, notification }));
  };
};

export const defaultNotification = (order: Order<string>): AppThunkAction => {
  const { productType, quantity, referenceExposure } = serializeOrder(order);

  const ticker = PRODUCT_TICKERS[productType];

  const formattedDefault = separateAndFix(quantity - Number(referenceExposure), 8);

  const toast = {
    type: ToastType.WARNING,
    message: `Default: ${formattedDefault} ${ticker}`
  };
  const notification = {
    title: `Default notification (${ticker})`,
    body: `Default: ${formattedDefault}`
  };

  return (dispatch) => {
    dispatch(notify({ toast, notification }));
  };
};

export const withdrawalRequestedNotification = (withdrawal: Withdrawal<string>): AppThunkAction => {
  const { amount, currency } = withdrawal;

  const formattedAmount = separateAndFix(amount, 2);

  const toast = { type: ToastType.SUCCESS, message: `Withdrawal of ${formattedAmount} ${currency} requested` };
  const notification = { title: 'Withdrawal requested', body: `Amount: ${formattedAmount}\nCurrency: ${currency}` };

  return (dispatch) => {
    dispatch(notify({ toast, notification }));
  };
};

export const withdrawalCancelledNotification = (withdrawal: Withdrawal<string>): AppThunkAction => {
  const { amount, currency } = withdrawal;

  const formattedAmount = separateAndFix(amount, 2);

  const toast = { type: ToastType.WARNING, message: `Withdrawal of ${formattedAmount} ${currency} cancelled` };
  const notification = { title: 'Withdrawal cancelled', body: `Amount: ${formattedAmount}\nCurrency: ${currency}` };

  return (dispatch) => {
    dispatch(notify({ toast, notification }));
  };
};

export const withdrawalExecutedNotification = (withdrawal: Withdrawal<string>): AppThunkAction => {
  const { amount, currency } = withdrawal;

  const formattedAmount = separateAndFix(-amount, 2);

  const toast = { type: ToastType.SUCCESS, message: `Withdrawal of ${formattedAmount} ${currency} executed` };
  const notification = { title: 'Withdrawal executed', body: `Amount: ${formattedAmount}\nCurrency: ${currency}` };

  return (dispatch) => {
    dispatch(notify({ toast, notification }));
  };
};

export const depositDetectedNotification = (deposit: Deposit<string>): AppThunkAction => {
  const { amount, currency } = serializeDeposit(deposit);

  const formattedAmount = separateAndFix(amount, 2);

  const toast = { type: ToastType.WARNING, message: `Deposit of ${formattedAmount} ${currency} detected` };
  const notification = { title: 'Deposit detected', body: `Amount: ${formattedAmount}\nCurrency: ${currency}` };

  return (dispatch) => {
    dispatch(notify({ toast, notification }));
  };
};

export const depositCreditedNotification = (deposit: Deposit<string>): AppThunkAction => {
  const { amount, currency } = serializeDeposit(deposit);

  const formattedAmount = separateAndFix(amount, 2);

  const toast = { type: ToastType.SUCCESS, message: `Deposit of ${formattedAmount} ${currency} credited` };
  const notification = { title: 'Deposit credited', body: `Amount: ${formattedAmount}\nCurrency: ${currency}` };

  return (dispatch) => {
    dispatch(notify({ toast, notification }));
  };
};

export const addressWhitelistedNotification = (address: Address): AppThunkAction => {
  const toast = { type: ToastType.SUCCESS, message: 'New deposit address whitelisted' };
  const notification = {
    title: 'New deposit address whitelisted',
    body: `Label: ${address.description || '-'}\nAddress: ${address.address}`
  };

  return (dispatch) => {
    dispatch(notify({ toast, notification }));
  };
};

export const corporateAccountCreatedNotification = (): AppThunkAction => {
  const toast = { type: ToastType.SUCCESS, message: 'Corporate account onboarding requested' };
  const notification = {
    title: 'Corporate account onboarding requested',
    body: 'Hi there, thank you for joining Leverex community! Happy to have you onboard.'
  };

  return (dispatch) => {
    dispatch(notify({ toast, notification }));
  };
};
