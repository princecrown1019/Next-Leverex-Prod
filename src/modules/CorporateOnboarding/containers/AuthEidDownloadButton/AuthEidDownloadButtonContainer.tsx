import React, { memo, useCallback, MouseEvent } from 'react';

import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { AuthEidDownloadButtonView } from '~/modules/CorporateOnboarding/views/AuthEidDownloadButton/AuthEidDownloadButtonView';

export const AuthEidDownloadButtonContainer = memo(() => {
  const { authEidDownloadControls } = useModalsContext();

  const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    authEidDownloadControls.open();
  }, []);

  return <AuthEidDownloadButtonView handleClick={handleClick} />;
});
