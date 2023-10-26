import React, { useCallback, useEffect, useState } from 'react';

import { PROD_ENV, SIDE_SHIFT_SCRIPT_URL, TESTNET_ENV, SIDE_SHIFT_PARENT } from '~/constants/configConstants';
import { ScriptComponent } from '~/components/Script/ScriptComponent';

export const useSideShift = (settleAddress: string | null) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.__SIDESHIFT__) {
      setReady(true);
      return;
    }

    if (!settleAddress || !ready) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.__SIDESHIFT__ = {
      parentAffiliateId: SIDE_SHIFT_PARENT,
      defaultDepositMethodId: 'btc',
      defaultSettleMethodId: 'usdtla',
      settleMethodId: 'usdtla',
      type: 'variable',
      settleAddress: TESTNET_ENV || PROD_ENV ? settleAddress : undefined
    };
  }, [ready, settleAddress]);

  const handleLoaded = useCallback(() => {
    setReady(true);
  }, []);

  const showWidget = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.sideshift?.show();
  }, []);

  const hideWidget = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.sideshift?.hide();
  }, []);

  useEffect(() => {
    return hideWidget;
  }, []);

  const SideShiftScript = useCallback(
    () => <ScriptComponent src={SIDE_SHIFT_SCRIPT_URL} onload={handleLoaded} persistant />,
    []
  );

  return { SideShiftScript, showWidget, hideWidget, ready };
};
