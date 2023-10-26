import React, { memo, useCallback, MouseEvent } from 'react';

import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { RegistrationButtonView } from '~/modules/CorporateOnboarding/views/RegistrationButton/RegistrationButtonView';

export const RegistrationButtonContainer = memo(() => {
  const { getStartedControls } = useModalsContext();

  const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    getStartedControls.open();
  }, []);

  return <RegistrationButtonView handleClick={handleClick} />;
});
