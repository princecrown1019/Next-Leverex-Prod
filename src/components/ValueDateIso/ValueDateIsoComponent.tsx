import React, { FC } from 'react';

import { toISODate } from '~/services/DateFormat/dateFormatService';

type Props = {
  children: number | string | Date;
};

export const ValueDateIsoComponent: FC<Props> = ({ children }) => <>{toISODate(children)}</>;
