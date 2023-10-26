import { isIOS } from 'react-device-detect';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const WS_AUTH_URL = publicRuntimeConfig.WS_AUTH_URL as string;
export const WS_MAIN_URL = publicRuntimeConfig.WS_MAIN_URL as string;
export const UPLOAD_API_URL = publicRuntimeConfig.UPLOAD_API_URL as string;

export const SDK_URL = publicRuntimeConfig.SDK_URL as string;
export const SDK_ISSUES_URL = `${SDK_URL}/issues`;

export const API_DOC_URL = publicRuntimeConfig.API_DOC_URL as string;

export const AUTH_EID_REQUEST_URL = publicRuntimeConfig.AUTH_EID_REQUEST_URL as string;

export const AUTH_EID_WEBSITE_URL = publicRuntimeConfig.AUTH_EID_WEBSITE_URL as string;
export const AUTH_EID_PLAY_MARKET_URL = publicRuntimeConfig.AUTH_EID_PLAY_MARKET_URL as string;
export const AUTH_EID_APP_STORE_URL = publicRuntimeConfig.AUTH_EID_APP_STORE_URL as string;
export const AUTH_EID_STORE_URL = isIOS ? AUTH_EID_PLAY_MARKET_URL : AUTH_EID_APP_STORE_URL;

export const LIQUID_NETWORK_WEBSITE_URL = publicRuntimeConfig.LIQUID_NETWORK_URL as string;
export const BLOCK_SETTLE_WEBSITE_URL = publicRuntimeConfig.BLOCK_SETTLE_URL as string;

export const TWITTER_URL = publicRuntimeConfig.TWITTER_URL as string;
export const TELEGRAM_URL = publicRuntimeConfig.TELEGRAM_URL as string;
export const DISCORD_URL = publicRuntimeConfig.DISCORD_URL as string;

export const INFO_EMAIL = publicRuntimeConfig.INFO_EMAIL as string;
export const SUPPORT_EMAIL = publicRuntimeConfig.SUPPORT_EMAIL as string;
export const COMPLIANCE_EMAIL = publicRuntimeConfig.COMPLIANCE_EMAIL as string;
export const PARTNERSHIPS_EMAIL = publicRuntimeConfig.PARTNERSHIPS_EMAIL as string;

export const PARTICIPANT_AGREEMENT_URL = publicRuntimeConfig.PARTICIPANT_AGREEMENT_URL as string;
export const PRODUCT_SPECIFICATION_USDT_URL = publicRuntimeConfig.PRODUCT_SPECIFICATION_USDT_URL as string;

export const TESTNET_URL = publicRuntimeConfig.TESTNET_URL as string;
export const PROD_URL = publicRuntimeConfig.PROD_URL as string;

export const ENV = publicRuntimeConfig.ENV as string;
export const FE = publicRuntimeConfig.FE as string;
export const DEV_ENV = ENV === 'dev';
export const TESTNET_ENV = ENV === 'uat';
export const PROD_ENV = ENV === 'prod';
export const DEVPREM_ENV = ENV === 'devprem';

export const DEV = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';
export const PROD = process.env.NODE_ENV === 'production';
export const DEVPREM = process.env.NODE_ENV === 'devprem';

export const SIDE_SHIFT_URL = publicRuntimeConfig.SIDE_SHIFT_URL as string;
export const SIDE_SHIFT_SCRIPT_URL = publicRuntimeConfig.SIDE_SHIFT_SCRIPT_URL as string;
export const SIDE_SHIFT_PARENT = publicRuntimeConfig.SIDE_SHIFT_PARENT as string;

export const GTM_ID = publicRuntimeConfig.GTM_ID as string;
