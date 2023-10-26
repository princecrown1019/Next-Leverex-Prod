import React, { FC, useEffect, useRef } from 'react';

import { useOnScreen } from '~/hooks/OnScreen/useOnScreen';
import { useModalsContext } from '~/contexts/Modals/ModalsContext';
import { InstitutionsSolutionsView, Props as ViewProps } from '~/modules/Corporates/views/Solutions/SolutionsView';
import style from '~/modules/Corporates/views/Solutions/style.module.scss';

type Props = Pick<ViewProps, 'className'>;

export const CorporatesSolutionsContainer: FC<Props> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { contactControls } = useModalsContext();

  const isOnScreen = useOnScreen(containerRef, -100);

  useEffect(() => {
    if (!isOnScreen) return;

    containerRef.current?.classList.add(style.solutionsLinkOnScreen);
  }, [isOnScreen]);

  return (
    <InstitutionsSolutionsView className={className} containerRef={containerRef} handleClick={contactControls.open} />
  );
};
