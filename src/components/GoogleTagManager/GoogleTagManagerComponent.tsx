import React, { FC } from 'react';

import Script from 'next/script';

import { GTM_ID, PROD_ENV, TESTNET_ENV } from '~/constants/configConstants';

const innerHTML = {
  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${GTM_ID});`
};

export const GoogleTagManagerComponent: FC = () => {
  return (PROD_ENV || TESTNET_ENV) && GTM_ID ? (
    <Script strategy="afterInteractive" dangerouslySetInnerHTML={innerHTML} />
  ) : null;
};
