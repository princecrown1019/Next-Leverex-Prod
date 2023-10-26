import React, { FC } from 'react';

import clsx from 'clsx';

import { AccountPath } from '~/constants/pathsConstants';
import { Product } from '~/types/productTypes';
import { LabelComponent } from '~/components/Label/LabelComponent';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { LoadingSessionWrapperComponent } from '~/components/LoadingSessionWrapper/LoadingSessionWrapperComponent';
import { ProductPairComponent } from '~/components/ProductPair/ProductPairComponent';
import { DepositIcon, WithdrawIcon } from '~/assets/Icons';

import style from './style.module.scss';

export type Props = {
  className?: string;
  product: Product;
};

export const ProductTransactionsSummaryView: FC<Props> = ({ className, product }) => {
  return (
    <LoadingSessionWrapperComponent className={clsx(style.dashboardProduct, className)}>
      <div>
        <LabelComponent className={style.dashboardProductLabel}>Product</LabelComponent>

        <div className={style.dashboardProductValue}>
          <product.Icon className={style.dashboardProductIcon} />
          <h6 className={style.dashboardProductName}>
            <ProductPairComponent ticker={product.ticker} currency={product.currency} />
          </h6>
        </div>
      </div>

      <div className={style.dashboardProductLinks}>
        <LinkComponent className={style.dashboardProductLink} href={AccountPath.DEPOSIT}>
          <span className={style.dashboardProductLinkIconContainer}>
            <DepositIcon className={style.dashboardProductLinkIcon} />
          </span>
          Deposit
        </LinkComponent>

        <LinkComponent className={style.dashboardProductLink} href={AccountPath.WITHDRAW}>
          <span className={style.dashboardProductLinkIconContainer}>
            <WithdrawIcon className={style.dashboardProductLinkIcon} />
          </span>
          Withdraw
        </LinkComponent>
      </div>
    </LoadingSessionWrapperComponent>
  );
};
