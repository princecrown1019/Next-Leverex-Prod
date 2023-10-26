import React, { FC, ReactNode } from 'react';

import style from './style.module.scss';

export type Props = {
  className?: string;
  children: ReactNode | ReactNode[];
};

export const LandingProductsView: FC<Props> = ({ className, children }) => (
  <section className={className}>
    <ul className={style.productsList}>{children}</ul>
  </section>
);
