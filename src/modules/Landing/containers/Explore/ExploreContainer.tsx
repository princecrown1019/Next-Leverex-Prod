import React, { FC } from 'react';

import { LandingExploreView, Props as ViewProps } from '~/modules/Landing/views/Explore/ExploreView';

type Props = Pick<ViewProps, 'className' | 'containerRef'>;

export const LandingExploreContainer: FC<Props> = ({ className, containerRef }) => {
  return <LandingExploreView className={className} containerRef={containerRef} />;
};
