import React, { FC, useRef } from 'react';

import { useOnScreen } from '~/hooks/OnScreen/useOnScreen';
import { InstitutionsAccessView, Props as ViewProps } from '~/modules/Corporates/views/Access/AccessView';

type Props = Pick<ViewProps, 'className' | 'containerRef'>;

export const CorporatesAccessContainer: FC<Props> = ({ className, containerRef }) => {
  const listRef = useRef<HTMLUListElement>(null);

  const isOnScreen = useOnScreen(listRef);

  return (
    <InstitutionsAccessView
      className={className}
      listRef={listRef}
      containerRef={containerRef}
      isOnScreen={isOnScreen}
    />
  );
};
