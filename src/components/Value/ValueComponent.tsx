import React, { FC, ReactNode } from 'react';

import { separateAndFix } from '~/services/NumberFormat/numberFormatService';

type Props = {
  children: number | string;
  fix?: number;
  abs?: boolean;
  after?: string;
  before?: string | ReactNode;
  withPositiveChar?: boolean;
};

export const ValueComponent: FC<Props> = ({ fix, abs, before, after, withPositiveChar, children }) => {
  const value = abs && typeof children === 'number' ? Math.abs(children) : children;

  return (
    <>
      {before ? before : null}
      {withPositiveChar && value > 0 ? '+' : null}
      {separateAndFix(value, fix)}
      {after ? after : null}
    </>
  );
};
