import React, { FC, RefObject } from 'react';
import { useSelector } from 'react-redux';

import { selectSocketMainLoading } from '~/store/SocketMain/selectors';
import { LoadingAnimatedOverlayComponent } from '~/components/LoadingAnimatedOverlay/LoadingAnimatedOverlayComponent';

type Props = {
  visible?: boolean;
  parentRef: RefObject<HTMLDivElement>;
};

export const LoadingSocketOverlayComponent: FC<Props> = ({ visible, parentRef }) => {
  const loadingSocket = useSelector(selectSocketMainLoading);

  return <LoadingAnimatedOverlayComponent visible={loadingSocket || visible} parentRef={parentRef} />;
};
