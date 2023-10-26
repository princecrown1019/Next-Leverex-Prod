import React, { FC } from 'react';

import { CorporatesParallaxView, Props as ViewProps } from '~/modules/Corporates/views/Parallax/ParallaxView';

export const CorporatesParallaxContainer: FC<ViewProps> = ({ className }) => (
  <CorporatesParallaxView className={className} />
);
