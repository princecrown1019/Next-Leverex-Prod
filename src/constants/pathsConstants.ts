import {
  AccountIcon,
  BankIcon,
  BellIcon,
  CircleChartIcon,
  DepositIcon,
  FeesIcon,
  FolderIcon,
  HelpIcon,
  HistoryIcon,
  KeyIcon,
  TradeIcon,
  WithdrawIcon
} from '~/assets/Icons';

export enum StaticPath {
  ABOUT_US = '/about-us',
  REGULATION = '/regulation',
  TERMS_OF_USE = '/terms-of-use',
  PRIVACY_POLICY = '/privacy-policy',
  PARTICIPANT_AGREEMENT = '/participant-agreement',
  MARKET_PROGRAM = '/market-marker-program'
}

export enum MainPath {
  HOME = '/',
  EXCHANGE = '/exchange',
  FAQ = '/faq',
  ACCOUNT = '/account',
  SETTINGS = '/settings',
  CORPORATES = '/corporates',
  NEWS = '/news'
}

export enum CorporatesPath {
  ONBOARDING = '/corporates/onboarding'
}

export enum AccountPath {
  DASHBOARD = '/account/dashboard',
  HISTORY = '/account/history',
  DEPOSIT = '/account/deposit',
  WITHDRAW = '/account/withdraw',
  ADDRESS_MANAGEMENT = '/account/address-management',
  ADDRESS_MANAGEMENT_NEW = '/account/address-management/new',
  KEY_MANAGEMENT = '/account/key-management',
  NOTIFICATIONS = '/account/notifications',
  KEY_MANAGEMENT_NEW = '/account/key-management/new',
  STATEMENTS = '/account/statements',
  CONTACTS = '/account/contact-us'
}

export enum FaqPath {
  DEPOSITS_AND_WITHDRAWALS = '/faq/deposits-and-withdrawals',
  TRADING = '/faq/trading',
  FEES = '/faq/fees',
  API = '/faq/api',
  ACCOUNT = '/faq/account',
  HELP_AND_CONTACT = '/faq/help-and-contact'
}

export const exchangeRegExp = new RegExp(MainPath.EXCHANGE);
export const faqRegExp = new RegExp(MainPath.FAQ);
export const accountRegExp = new RegExp(MainPath.ACCOUNT);

export const accountPagePaths = [
  {
    label: 'Dashboard',
    href: AccountPath.DASHBOARD,
    Icon: CircleChartIcon
  },
  {
    label: 'History',
    href: AccountPath.HISTORY,
    Icon: HistoryIcon
  },
  {
    label: 'Deposit',
    href: AccountPath.DEPOSIT,
    Icon: DepositIcon
  },
  {
    label: 'Withdraw',
    href: AccountPath.WITHDRAW,
    Icon: WithdrawIcon
  },
  {
    label: 'Address management',
    href: AccountPath.ADDRESS_MANAGEMENT,
    Icon: BankIcon,
    isActive: (path: string) => path === AccountPath.ADDRESS_MANAGEMENT || path === AccountPath.ADDRESS_MANAGEMENT_NEW
  },
  {
    label: 'Notifications',
    href: AccountPath.NOTIFICATIONS,
    Icon: BellIcon
  },
  {
    label: 'Key management',
    href: AccountPath.KEY_MANAGEMENT,
    Icon: KeyIcon,
    isActive: (path: string) => path === AccountPath.KEY_MANAGEMENT || path === AccountPath.KEY_MANAGEMENT_NEW
  },
  {
    label: 'Statements',
    href: AccountPath.STATEMENTS,
    Icon: FolderIcon
  },
  {
    label: 'Contact us',
    href: AccountPath.CONTACTS,
    Icon: HelpIcon
  }
];

export const faqPagePaths = [
  {
    label: 'Deposits & Withdrawals',
    href: FaqPath.DEPOSITS_AND_WITHDRAWALS,
    Icon: DepositIcon
  },
  {
    label: 'Trading',
    href: FaqPath.TRADING,
    Icon: TradeIcon
  },
  {
    label: 'Fees',
    href: FaqPath.FEES,
    Icon: FeesIcon
  },
  {
    label: 'API',
    href: FaqPath.API,
    Icon: KeyIcon
  },
  {
    label: 'Account',
    href: FaqPath.ACCOUNT,
    Icon: AccountIcon
  },
  {
    label: 'Help & Contact',
    href: FaqPath.HELP_AND_CONTACT,
    Icon: HelpIcon
  }
];
