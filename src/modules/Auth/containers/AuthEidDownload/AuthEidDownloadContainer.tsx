import React, { memo, useCallback, useMemo, useState } from 'react';

import { AUTH_EID_APP_STORE_URL, AUTH_EID_PLAY_MARKET_URL } from '~/constants/configConstants';
import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { AuthEidDownloadView } from '~/modules/Auth/views/AuthEidDownload/AuthEidDownloadView';

enum Tab {
  ANDROID,
  IOS
}

export const AuthEidDownloadContainer = memo(() => {
  const [tabIdx, setTabIdx] = useState(Tab.ANDROID);

  const { authEidDownloadVisible, authEidDownloadControls, authEidVerifyControls } = useModalsContext();

  const androidSelected = useMemo(() => tabIdx === Tab.ANDROID, [tabIdx]);

  const link = useMemo(() => {
    return androidSelected ? AUTH_EID_PLAY_MARKET_URL : AUTH_EID_APP_STORE_URL;
  }, [androidSelected]);

  const handleTabChange = useCallback((idx: number) => {
    setTabIdx(idx);
  }, []);

  return (
    <AuthEidDownloadView
      link={link}
      tabIdx={tabIdx}
      androidSelected={androidSelected}
      handleTabChange={handleTabChange}
      visible={authEidDownloadVisible}
      handleClose={authEidDownloadControls.close}
      handleContinueClick={authEidVerifyControls.open}
      handleBack={authEidVerifyControls?.back}
    />
  );
});
