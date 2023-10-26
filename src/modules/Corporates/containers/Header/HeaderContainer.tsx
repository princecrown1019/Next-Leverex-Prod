import React, { FC, MouseEvent, useCallback, useState } from 'react';

import { InstitutionsHeaderView, Props as ViewProps } from '~/modules/Corporates/views/Header/HeaderView';

type Props = Omit<ViewProps, 'handleBurgerClick' | 'open'>;

export const CorporatesHeaderContainer: FC<Props> = (props) => {
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
    <InstitutionsHeaderView
      {...props}
      open={open}
      handleBurgerClick={handleBurgerClick}
      handleFeaturesClick={handleFeaturesClick}
      handleToolsClick={handleToolsClick}
      handleExploreClick={handleExploreClick}
    />
  );
};
