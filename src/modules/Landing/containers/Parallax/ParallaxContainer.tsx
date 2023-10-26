import React, { FC } from 'react';

import { LandingParallaxView, Props as ViewProps } from '~/modules/Landing/views/Parallax/ParallaxView';

export const LandingParallaxContainer: FC<ViewProps> = ({ className }) => <LandingParallaxView className={className} />;
