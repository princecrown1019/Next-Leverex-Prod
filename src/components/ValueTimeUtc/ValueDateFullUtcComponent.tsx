import React, { FC } from 'react';

import { toUTCStringTime } from '~/services/DateFormat/dateFormatService';

type Props = {
  children: number | string | Date;
};

export const ValueTimeUtcComponent: FC<Props> = ({ children }) => <>{toUTCStringTime(children)}</>;
