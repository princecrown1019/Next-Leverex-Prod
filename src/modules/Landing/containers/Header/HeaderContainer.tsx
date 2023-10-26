import React, { FC, MouseEvent, useCallback, useState } from 'react';

import { LandingHeaderView, Props as ViewProps } from '~/modules/Landing/views/Header/HeaderView';
import { useModalsContext } from '~/contexts/Modals/ModalsContext';

type Props = Omit<ViewProps, 'handleBurgerClick' | 'open'>;

export const LandingHeaderContainer: FC<Props> = (props) => {
  const { getStartedControls } = useModalsContext();

  const [open, setOpen] = useState(false);

  const handleBurgerClick = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleFeaturesClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    props.handleFeaturesClick(event);
  }, []);

  const handleToolsClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    props.handleToolsClick(event);
  }, []);

  const handleExploreClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    props.handleExploreClick(event);
  }, []);

  return (
    <LandingHeaderView
      {...props}
      open={open}
      handleRegisterClick={getStartedControls.open}
      handleBurgerClick={handleBurgerClick}
      handleFeaturesClick={handleFeaturesClick}
      handleToolsClick={handleToolsClick}
      handleExploreClick={handleExploreClick}
    />
  );
};
