import React, { FC } from 'react';

import { InstitutionsExploreView, Props as ViewProps } from '~/modules/Corporates/views/Explore/ExploreView';

type Props = Pick<ViewProps, 'className' | 'containerRef'>;

export const CorporatesExploreContainer: FC<Props> = ({ className, containerRef }) => {
  return <InstitutionsExploreView className={className} containerRef={containerRef} />;
};
