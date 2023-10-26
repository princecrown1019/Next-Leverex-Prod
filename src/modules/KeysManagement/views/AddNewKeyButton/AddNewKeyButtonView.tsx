import React, { FC } from 'react';

import { AccountPath } from '~/constants/pathsConstants';
import { LinkBadgeComponent } from '~/components/LinkBadge/LinkBadgeComponent';

export type Props = {
  className?: string;
};

export const AddNewKeyButtonView: FC<Props> = ({ className }) => (
  <LinkBadgeComponent className={className} href={AccountPath.KEY_MANAGEMENT_NEW}>
    + Add new device key
  </LinkBadgeComponent>
);
