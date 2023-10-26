import React, { FC } from 'react';

import { toUTCStringDate, toUTCStringTime } from '~/services/DateFormat/dateFormatService';

type Props = {
  children: number | string | Date;
};

export const ValueDateFullUtcComponent: FC<Props> = ({ children }) => (
  <>
    {toUTCStringDate(children)} {toUTCStringTime(children)}
  </>
);
