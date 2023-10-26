import React, { FC, ReactNode } from 'react';

import { separateAndFix } from '~/services/NumberFormat/numberFormatService';

type Props = {
  children: number | string;
  fix?: number;
  abs?: boolean;
  after?: string;
  withPositiveChar?: boolean;
  before?: string | ReactNode;
  placeholder?: string;
};

export const ValueBlankComponent: FC<Props> = ({
  fix,
  abs,
  before,
  after,
  placeholder,
  withPositiveChar,
  children
}) => {
  const value = abs && typeof children === 'number' ? Math.abs(children) : children;

  return (
    <>
      {children ? before : null}
      {withPositiveChar && value > 0 ? '+' : null}
      {children ? separateAndFix(value, fix) : placeholder || '-'}
      {children ? after : null}
    </>
  );
};
