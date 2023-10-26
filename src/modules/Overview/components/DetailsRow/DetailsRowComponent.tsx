import React, { memo, ReactNode } from 'react';

import { LabelComponent } from '~/components/Label/LabelComponent';

import style from './style.module.scss';

export type Props = {
  label: string;
  children: ReactNode | ReactNode[];
};

export const DetailsRowComponent = memo<Props>(({ label, children }) => (
  <div className={style.detailsRow}>
    <LabelComponent className={style.detailsRowLabel} htmlFor="label">
      {label}
    </LabelComponent>

    <p className={style.detailsRowValue} id={label}>
      {children}
    </p>
  </div>
));
