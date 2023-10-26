import React from 'react';
import { useSelector } from 'react-redux';

import { ProductType } from '~/types/productTypes';
import { selectProduct } from '~/store/Market/selectors';
import { OverviewDetailsView } from '~/modules/Overview/views/Details/DetailsView';

const descriptions = {
  //   [ProductType.BTC_EURX]: {
  //     primary: `
  // EURx is a blockchain-based cryptocurrency whose tokens in circulation are backed by an
  // equivalent amount of Euro, making it a stablecoin with a price pegged to EUR €1.00.
  //     `,
  //     secondary: `
  // Stablecoins track traditional fiat currencies, like the dollar, the euro, or the Japanese yen,
  // which are held in a designated bank account.`
  //   },
  [ProductType.BTC_USDT]: {
    primary: `
Tether USD is a blockchain-based cryptocurrency whose tokens in circulation are backed by an
equivalent amount of U.S. dollars, making it a stablecoin with a price pegged to USD $1.00.
    `,
    secondary: `
Stablecoins track traditional fiat currencies, like the dollar,
the euro, or the Japanese yen, which are held in a designated bank account.`
  },
  [ProductType.ETH_USDT]: {
    primary: `
Tether USD is a blockchain-based cryptocurrency whose tokens in circulation are backed by an
equivalent amount of U.S. dollars, making it a stablecoin with a price pegged to USD $1.00.
    `,
    secondary: `
Stablecoins track traditional fiat currencies, like the dollar,
the euro, or the Japanese yen, which are held in a designated bank account.`
  }
};

export const OverviewDetailsContainer = () => {
  const product = useSelector(selectProduct);

  return (
    <OverviewDetailsView
      product={product}
      mainDescription={descriptions[product.type].primary}
      secondaryDescription={descriptions[product.type].secondary}
    />
  );
};
