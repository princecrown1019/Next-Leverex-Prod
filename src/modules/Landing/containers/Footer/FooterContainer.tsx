import React, { FC, useMemo } from 'react';

import { TESTNET_URL, PROD_URL, TESTNET_ENV } from '~/constants/configConstants';
import { useMedia } from '~/hooks/Media/useMedia';
import {
  LandingFooterDesktopView,
  Props as DesktopViewProps
} from '~/modules/Landing/views/FooterDesktop/FooterDesktopView';
import {
  LandingFooterMobileView,
  Props as MobileViewProps
} from '~/modules/Landing/views/FooterMobile/FooterMobileView';

type Props = Pick<DesktopViewProps & MobileViewProps, 'className'>;

export const LandingFooterContainer: FC<Props> = ({ className }) => {
  const mdMedia = useMedia(1100.98);

  const linkHref = useMemo(() => (TESTNET_ENV ? PROD_URL : TESTNET_URL), []);
  const linkLabel = useMemo(() => (TESTNET_ENV ? 'Mainnet' : 'Testnet'), []);

  return mdMedia ? (
    <LandingFooterMobileView className={className} linkHref={linkHref} linkLabel={linkLabel} />
  ) : (
    <LandingFooterDesktopView className={className} linkHref={linkHref} linkLabel={linkLabel} />
  );
};
