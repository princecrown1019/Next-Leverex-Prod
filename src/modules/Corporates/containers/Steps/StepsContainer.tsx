import React, { FC, useEffect, useRef } from 'react';

import { useOnScreen } from '~/hooks/OnScreen/useOnScreen';
import { InstitutionsStepsView, Props as ViewProps } from '~/modules/Corporates/views/Steps/StepsView';
import style from '~/modules/Corporates/views/Steps/style.module.scss';

type Props = Pick<ViewProps, 'className' | 'containerRef'>;

export const CorporatesStepsContainer: FC<Props> = ({ className, containerRef }) => {
  const listRef = useRef<HTMLUListElement>(null);

  const isOnScreen = useOnScreen(listRef, -150);

  useEffect(() => {
    if (!isOnScreen || !listRef.current) return;

    listRef.current.classList.add(style.stepsListOnScreen);
  }, [isOnScreen]);

  return <InstitutionsStepsView className={className} containerRef={containerRef} listRef={listRef} />;
};
