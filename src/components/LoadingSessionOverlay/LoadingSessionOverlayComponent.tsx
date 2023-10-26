import React, { FC, RefObject } from 'react';
import { useSelector } from 'react-redux';

import { selectAuthorizeSessionLoading } from '~/store/Session/selectors';
import { LoadingAnimatedOverlayComponent } from '~/components/LoadingAnimatedOverlay/LoadingAnimatedOverlayComponent';

type Props = {
  parentRef: RefObject<HTMLDivElement>;
};

export const LoadingSessionOverlayComponent: FC<Props> = ({ parentRef }) => {
  const loadingAuthorize = useSelector(selectAuthorizeSessionLoading);

  return <LoadingAnimatedOverlayComponent visible={loadingAuthorize} parentRef={parentRef} />;
};
