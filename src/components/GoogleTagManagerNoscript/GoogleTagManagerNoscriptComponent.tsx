import React, { FC } from 'react';

import { GTM_ID, PROD_ENV, TESTNET_ENV } from '~/constants/configConstants';

const innerHTML = {
  __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`
};

export const GoogleTagManagerNoscriptComponent: FC = () => {
  return (PROD_ENV || TESTNET_ENV) && GTM_ID ? <noscript dangerouslySetInnerHTML={innerHTML} /> : null;
};
