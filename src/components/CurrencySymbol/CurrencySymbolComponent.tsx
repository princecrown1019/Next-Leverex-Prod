import React, { FC } from 'react';

import { CURRENCY_SYMBOLS } from '~/constants/currencyConstants';
import { Currency } from '~/types/currencyTypes';

type Props = {
  currency: Currency;
};

export const CurrencySymbolComponent: FC<Props> = ({ currency }) => <>{CURRENCY_SYMBOLS[currency]}</>;
