import React, { FC, useEffect, useRef } from 'react';

import { useOnScreen } from '~/hooks/OnScreen/useOnScreen';
import { LandingFeaturesView, Props as ViewProps } from '~/modules/Landing/views/Features/FeaturesView';
import style from '~/modules/Landing/views/Features/style.module.scss';

type Props = Pick<ViewProps, 'className' | 'containerRef'>;

export const LandingFeaturesContainer: FC<Props> = ({ className, containerRef }) => {
  const listRef = useRef<HTMLUListElement>(null);

  const isOnScreen = useOnScreen(listRef, -150);

  useEffect(() => {
    if (!isOnScreen || !listRef.current) return;

    listRef.current.classList.add(style.featuresListOnScreen);
  }, [isOnScreen]);

  return <LandingFeaturesView className={className} containerRef={containerRef} listRef={listRef} />;
};
