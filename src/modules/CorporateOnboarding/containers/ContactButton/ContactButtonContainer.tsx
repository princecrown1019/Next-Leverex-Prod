import React, { memo, useCallback, MouseEvent } from 'react';

import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { ContactButtonView } from '~/modules/CorporateOnboarding/views/ContactButton/ContactButtonView';

export const ContactButtonContainer = memo(() => {
  const { contactControls } = useModalsContext();

  const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    contactControls.open();
  }, []);

  return <ContactButtonView handleClick={handleClick} />;
});
