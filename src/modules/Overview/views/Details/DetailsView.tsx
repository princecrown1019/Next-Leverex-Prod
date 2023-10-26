import React, { FC } from 'react';

import clsx from 'clsx';

import { PARTICIPANT_AGREEMENT_URL, PRODUCT_SPECIFICATION_USDT_URL } from '~/constants/configConstants';
import { Product } from '~/types/productTypes';
import { LinkComponent } from '~/components/Link/LinkComponent';
import { DividerComponent } from '~/components/Divider/DividerComponent';
import { DetailsRowComponent } from '~/modules/Overview/components/DetailsRow/DetailsRowComponent';
import { LinkIcon } from '~/assets/Icons';
import { TagComponent } from '~/components/Tag/TagComponent';
import { ProductPairFullComponent } from '~/components/ProductPairFull/ProductPairFullComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
  product: Product;
  mainDescription: string;
  secondaryDescription: string;
};

export const OverviewDetailsView: FC<Props> = ({ className, product, mainDescription, secondaryDescription }) => {
  return (
    <div className={clsx(style.overviewDetails, className)}>
      <div className={style.overviewDetailsPart}>
        <div className={style.overviewDetailsPartLeftInner}>
          <div className={style.overviewDetailsProduct}>
            <product.Icon className={style.overviewDetailsProductIcon} />
            <h5 className={style.overviewDetailsProductName}>
              <ProductPairFullComponent ticker={product.ticker} currency={product.currency} />
            </h5>
          </div>

          <p className={clsx(style.overviewDetailsDescription, style.overviewDetailsDescriptionMain)}>
            {mainDescription}
          </p>

          <p className={clsx(style.overviewDetailsDescription, style.overviewDetailsDescriptionSecondary)}>
            {secondaryDescription}
          </p>

          <div className={style.overviewDetailsLinks}>
            <LinkComponent className={style.overviewDetailsLink} href={PARTICIPANT_AGREEMENT_URL} target="_blank">
              <LinkIcon className={style.overviewDetailsLinkIcon} />
              Participant agreement
            </LinkComponent>
            <LinkComponent className={style.overviewDetailsLink} href={PRODUCT_SPECIFICATION_USDT_URL} target="_blank">
              <LinkIcon className={style.overviewDetailsLinkIcon} />
              Product specification
            </LinkComponent>
          </div>
        </div>
      </div>

      <DividerComponent vertical />

      <div className={clsx(style.overviewDetailsPart, style.overviewDetailsPartRight)}>
        <div className={style.overviewDetailsPartRightInner}>
          <DetailsRowComponent label="Currencies traded">
            {product.ticker}, {product.currency}
          </DetailsRowComponent>
          <DetailsRowComponent label="Matching model">Request-for-stream, Market orders</DetailsRowComponent>
          <DetailsRowComponent label="Base currency">{product.ticker}</DetailsRowComponent>
          <DetailsRowComponent label="Quote currency">{product.currency}</DetailsRowComponent>
          <DetailsRowComponent label="Minimum contract size">
            0.001 <TagComponent className={style.overviewDetailsAssetTag}>{product.ticker}</TagComponent>
          </DetailsRowComponent>
          <DetailsRowComponent label="Minimum contract increment">
            0.00000001 <TagComponent className={style.overviewDetailsAssetTag}>{product.ticker}</TagComponent>
          </DetailsRowComponent>
          <DetailsRowComponent label="Initial margin (IM)">10%</DetailsRowComponent>
          <DetailsRowComponent label="Maximum Profit/Loss">Equal to Initial Margin (IM)</DetailsRowComponent>
          <DetailsRowComponent label="Trading hours">24 / 7 / 365</DetailsRowComponent>
          <DetailsRowComponent label="Session schedule">00:00:00 - 00.59.59 every hour</DetailsRowComponent>
          <DetailsRowComponent label="Settlement">Stablecoin settlement</DetailsRowComponent>
          <DetailsRowComponent label="Cash settlement">
            Book-entry settlement upon settlement finality
          </DetailsRowComponent>
          <DetailsRowComponent label="Final settlement price">
            Mid-point between 3 best streamed bids and offers
          </DetailsRowComponent>
        </div>
      </div>
    </div>
  );
};
