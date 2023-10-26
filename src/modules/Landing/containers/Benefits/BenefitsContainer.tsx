import React, { FC, useEffect, useRef } from 'react';

import { LandingBenefitsView, Props as ViewProps } from '~/modules/Landing/views/Benefits/BenefitsView';
import { useOnScreen } from '~/hooks/OnScreen/useOnScreen';
import style from '~/modules/Landing/views/Benefits/style.module.scss';

type Props = Pick<ViewProps, 'className'>;

export const LandingBenefitsContainer: FC<Props> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const isOnScreen = useOnScreen(containerRef, -100);

  useEffect(() => {
    if (!isOnScreen || !containerRef.current) return;

    containerRef.current.classList.add(style.benefitsLinkOnScreen);
  }, [isOnScreen]);

  return <LandingBenefitsView className={className} containerRef={containerRef} />;
};
