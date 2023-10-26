import React, { FC } from 'react';

import { AccountPath } from '~/constants/pathsConstants';
import { LinkBadgeComponent } from '~/components/LinkBadge/LinkBadgeComponent';

export type Props = {
  className?: string;
};

export const AddNewAddressButtonView: FC<Props> = ({ className }) => (
  <LinkBadgeComponent className={className} href={AccountPath.ADDRESS_MANAGEMENT_NEW}>
    + Whitelist new address
  </LinkBadgeComponent>
);
